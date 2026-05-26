'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/lib/firebase';
import { compressImage, compressVideo } from '@/lib/mediaCompress';

export default function AdminCreateSiteUpdatePage() {
  const router = useRouter();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    subHeadline: '',
    projectId: '',
    videoUrl: '',
    description: '',
    date: new Date().toISOString().split('T')[0] // Defaults to YYYY-MM-DD
  });
  
  // Media items with upload tracking
  const [mediaItems, setMediaItems] = useState([]);
  const [mediaUrlsText, setMediaUrlsText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  // We need a ref to access current projectId inside asynchronous upload handlers
  const projectIdRef = useRef('');
  useEffect(() => {
    projectIdRef.current = formData.projectId;
  }, [formData.projectId]);

  useEffect(() => {
    async function loadProjects() {
      try {
        const snap = await getDocs(collection(db, 'projects'));
        const list = snap.docs.map(doc => ({
          id: doc.id,
          name: doc.data().name || doc.id
        }));
        setProjects(list);
        if (list.length > 0) {
          setFormData(prev => ({ ...prev, projectId: list[0].id }));
        }
      } catch (err) {
        console.error('Failed to load projects list:', err);
        setError('Error loading estates database list.');
      } finally {
        setLoading(false);
      }
    }
    loadProjects();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Upload file function
  const uploadFileTask = (file, itemId) => {
    const projId = projectIdRef.current || 'unknown';
    const fileRef = ref(storage, `site-updates/${projId}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`);
    const uploadTask = uploadBytesResumable(fileRef, file);

    uploadTask.on('state_changed',
      (snapshot) => {
        const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setMediaItems(prev => prev.map(item => 
          item.id === itemId ? { ...item, progress: percent, status: 'uploading' } : item
        ));
      },
      (err) => {
        console.error('Upload error:', err);
        setMediaItems(prev => prev.map(item => 
          item.id === itemId ? { ...item, status: 'error' } : item
        ));
      },
      async () => {
        try {
          const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
          setMediaItems(prev => prev.map(item => 
            item.id === itemId ? { ...item, url: downloadUrl, status: 'done', progress: 100 } : item
          ));
        } catch (err) {
          setMediaItems(prev => prev.map(item => 
            item.id === itemId ? { ...item, status: 'error' } : item
          ));
        }
      }
    );
  };

  const handleFileChange = async (e) => {
    if (!e.target.files) return;
    const filesArray = Array.from(e.target.files);

    // Create placeholder media items in state
    const newItems = filesArray.map(file => ({
      id: Math.random().toString(),
      name: file.name,
      type: file.type,
      progress: 0,
      status: 'compressing',
      url: '',
      previewUrl: URL.createObjectURL(file)
    }));

    setMediaItems(prev => [...prev, ...newItems]);

    // Compress & Upload each file in the background
    filesArray.forEach(async (file, idx) => {
      const itemPlaceholder = newItems[idx];
      try {
        let fileToUpload = file;
        if (file.type.startsWith('image/')) {
          fileToUpload = await compressImage(file);
        } else if (file.type.startsWith('video/')) {
          fileToUpload = await compressVideo(file, (pct) => {
            setMediaItems(prev => prev.map(item =>
              item.id === itemPlaceholder.id ? { ...item, progress: pct, status: 'compressing' } : item
            ));
          });
        }
        
        // Update state to uploading
        setMediaItems(prev => prev.map(item => 
          item.id === itemPlaceholder.id ? { ...item, status: 'uploading' } : item
        ));

        // Start upload
        uploadFileTask(fileToUpload, itemPlaceholder.id);
      } catch (err) {
        console.error('Compression/Upload prep failed:', err);
        setMediaItems(prev => prev.map(item => 
          item.id === itemPlaceholder.id ? { ...item, status: 'error' } : item
        ));
      }
    });
  };

  const handleRemoveMedia = (itemId) => {
    setMediaItems(prev => prev.filter(item => item.id !== itemId));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.projectId || !formData.description) {
      setError('Please provide a Title, select a Project, and provide an Update Description.');
      return;
    }

    const anyUploading = mediaItems.some(item => item.status === 'compressing' || item.status === 'uploading');
    if (anyUploading) {
      setError('Please wait for all media files to finish uploading before publishing.');
      return;
    }

    const pastedUrls = mediaUrlsText
      .split(/[\n,]+/)
      .map(url => url.trim())
      .filter(url => url !== '');

    const completedUrls = mediaItems.filter(item => item.status === 'done').map(item => item.url);
    const finalUrls = [...completedUrls, ...pastedUrls];

    if (finalUrls.length === 0) {
      setError('Please upload at least one file or paste a valid media URL.');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      // 2. Save document to Firestore (Instantly!)
      await addDoc(collection(db, 'siteUpdates'), {
        ...formData,
        images: finalUrls,
        image: finalUrls[0] || '', // Backwards compatibility
        createdAt: new Date().toISOString()
      });
      router.push('/admin/dashboard/site-updates');
    } catch (err) {
      console.error('Failed to save site update:', err);
      setError('Error saving site update to database.');
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="admin-skeleton-spinner"></div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <header className="admin-header" style={{ marginBottom: '32px' }}>
        <div className="admin-title-group">
          <h1>Add Progress Update</h1>
          <p>Publish landmark construction updates or video walkthroughs for estates.</p>
        </div>
        <Link href="/admin/dashboard/site-updates" className="admin-btn" style={{ textDecoration: 'none', width: 'auto', padding: '10px 20px' }}>
          ← Back to Updates
        </Link>
      </header>

      {error && (
        <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#EF4444', padding: '12px 16px', borderRadius: '4px', marginBottom: '24px', fontSize: '13px' }}>
          {error}
        </div>
      )}

      <div className="admin-section-card" style={{ padding: '32px' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '20px' }}>
            <div className="form-group">
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--admin-text-secondary)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Update Headline / Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Laying of main utility conduits and road grading"
                required
                style={{ width: '100%', padding: '12px 16px', borderRadius: '4px', border: '1px solid var(--admin-border)', backgroundColor: 'var(--admin-bg)', color: 'var(--admin-text-primary)', fontSize: '13px', outline: 'none' }}
              />
            </div>

            <div className="form-group">
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--admin-text-secondary)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Select Estate / Project *
              </label>
              <select
                name="projectId"
                value={formData.projectId}
                onChange={handleChange}
                required
                style={{ width: '100%', padding: '12px 16px', borderRadius: '4px', border: '1px solid var(--admin-border)', backgroundColor: 'var(--admin-bg)', color: 'var(--admin-text-primary)', fontSize: '13px', outline: 'none', cursor: 'pointer' }}
              >
                {projects.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '20px' }}>
            <div className="form-group">
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--admin-text-secondary)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Sub-Headline (Under Estate Name)
              </label>
              <input
                type="text"
                name="subHeadline"
                value={formData.subHeadline}
                onChange={handleChange}
                placeholder="e.g. Some text explaining what these updates are for..."
                style={{ width: '100%', padding: '12px 16px', borderRadius: '4px', border: '1px solid var(--admin-border)', backgroundColor: 'var(--admin-bg)', color: 'var(--admin-text-primary)', fontSize: '13px', outline: 'none' }}
              />
            </div>

            <div className="form-group">
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--admin-text-secondary)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Optional Video Walkthrough URL
              </label>
              <input
                type="url"
                name="videoUrl"
                value={formData.videoUrl}
                onChange={handleChange}
                placeholder="e.g. https://www.youtube.com/embed/... or paste hosted mp4"
                style={{ width: '100%', padding: '12px 16px', borderRadius: '4px', border: '1px solid var(--admin-border)', backgroundColor: 'var(--admin-bg)', color: 'var(--admin-text-primary)', fontSize: '13px', outline: 'none' }}
              />
            </div>

            <div className="form-group">
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--admin-text-secondary)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Date of Update *
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                style={{ width: '100%', padding: '12px 16px', borderRadius: '4px', border: '1px solid var(--admin-border)', backgroundColor: 'var(--admin-bg)', color: 'var(--admin-text-primary)', fontSize: '13px', outline: 'none' }}
              />
            </div>
          </div>

          {/* Media Section */}
          <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--admin-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>
              Upload Progress Media * (Images/Videos upload instantly)
            </label>
            
            <input 
              type="file" 
              multiple 
              accept="image/*,video/*" 
              onChange={handleFileChange}
              style={{
                padding: '12px 16px', borderRadius: '4px', border: '1px dashed var(--admin-border)', backgroundColor: 'var(--admin-bg)', color: 'var(--admin-text-primary)', fontSize: '13px', outline: 'none', cursor: 'pointer'
              }}
            />

            {/* Media Uploads Grid & Progress Bar UI */}
            {mediaItems.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '12px' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                  {mediaItems.map((item) => (
                    <div key={item.id} style={{ position: 'relative', width: '100px', height: '100px', borderRadius: '4px', overflow: 'hidden', border: '1px solid var(--admin-border)', backgroundColor: 'var(--admin-surface-light)' }}>
                      
                      {/* Media type specific preview */}
                      {item.type.startsWith('video/') ? (
                        <video
                          src={item.previewUrl}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          muted
                          loop
                          playsInline
                        />
                      ) : (
                        <img
                          src={item.previewUrl}
                          alt={item.name}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      )}

                      {/* Loading status overlays */}
                      {item.status === 'compressing' && (
                        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', color: '#fff', fontSize: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '4px' }}>
                          Optimizing...
                        </div>
                      )}

                      {item.status === 'uploading' && (
                        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', color: '#fff', fontSize: '11px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                          <span>{item.progress}%</span>
                        </div>
                      )}

                      {item.status === 'error' && (
                        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(239,68,68,0.8)', color: '#fff', fontSize: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          Failed
                        </div>
                      )}

                      <button
                        type="button"
                        onClick={() => handleRemoveMedia(item.id)}
                        style={{
                          position: 'absolute', top: '4px', right: '4px', background: 'rgba(239, 68, 68, 0.9)', color: '#fff', border: 'none', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '12px', padding: 0, zIndex: 10
                        }}
                        title="Remove"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Paste URL Fallback Section */}
            <div style={{ marginTop: '16px', borderTop: '1px dashed var(--admin-border)', paddingTop: '16px' }}>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--admin-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
                OR Paste Media URLs (Fallback / No Upload Required)
              </label>
              <textarea
                value={mediaUrlsText}
                onChange={(e) => setMediaUrlsText(e.target.value)}
                placeholder="Paste direct image or video URLs here (one per line or separated by commas)..."
                rows="3"
                style={{
                  width: '100%', padding: '12px 16px', borderRadius: '4px', border: '1px solid var(--admin-border)', backgroundColor: 'var(--admin-bg)', color: 'var(--admin-text-primary)', fontSize: '13px', outline: 'none', fontFamily: 'inherit', resize: 'vertical'
                }}
              />
              <span style={{ fontSize: '11px', color: 'var(--admin-text-secondary)', marginTop: '4px', display: 'block' }}>
                Use this option if you cannot upload files due to Firebase Storage plan limits.
              </span>
            </div>
          </div>

          <div className="form-group">
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--admin-text-secondary)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Progress Update Description / Content *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="6"
              required
              placeholder="Describe the details of the work completed or milestone achieved..."
              style={{ width: '100%', padding: '16px', borderRadius: '4px', border: '1px solid var(--admin-border)', backgroundColor: 'var(--admin-bg)', color: 'var(--admin-text-primary)', fontSize: '13px', outline: 'none', fontFamily: 'inherit', resize: 'vertical', lineHeight: '1.6' }}
            ></textarea>
          </div>

          <button
            type="submit"
            className="admin-btn active"
            disabled={submitting || mediaItems.some(item => item.status === 'compressing' || item.status === 'uploading')}
            style={{ width: '100%', marginTop: '12px', padding: '14px' }}
          >
            {submitting ? 'Publishing Update...' : mediaItems.some(item => item.status === 'compressing' || item.status === 'uploading') ? 'Uploading files...' : 'Publish Progress Update'}
          </button>
        </form>
      </div>
    </div>
  );
}
