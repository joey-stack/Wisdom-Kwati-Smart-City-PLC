'use client';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function BrochureModal() {
    const pathname = usePathname();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const handleOpen = () => {
            const modal = document.getElementById('brochureModal');
            if (modal) {
                modal.classList.add('active');
                document.body.classList.add('no-scroll');
            }
        };
        window.addEventListener('open-brochure-modal', handleOpen);
        return () => window.removeEventListener('open-brochure-modal', handleOpen);
    }, []);

    if (pathname && pathname.startsWith('/admin')) {
        return null;
    }

    const closeBrochureModal = () => {
        const modal = document.getElementById('brochureModal');
        if (modal) {
            modal.classList.remove('active');
            document.body.classList.remove('no-scroll');
        }
        setTimeout(() => {
            setSuccess(false);
            setName('');
            setEmail('');
            setError('');
        }, 300);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !email) {
            setError('Please provide your name and email.');
            return;
        }

        setError('');
        setSubmitting(true);

        try {
            const response = await fetch('/api/inquiry', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: 'brochure',
                    name,
                    email
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to request brochure.');
            }

            setSuccess(true);
            
            setTimeout(() => {
                closeBrochureModal();
            }, 3000);

        } catch (err) {
            console.error('Failed to submit brochure request:', err);
            setError(err.message || 'Submission failed. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="site-visit-modal-overlay" id="brochureModal" role="dialog" aria-modal="true">
            <div className="site-visit-modal-container brochure-modal-container">
                <button className="site-visit-modal-close" onClick={closeBrochureModal} aria-label="Close Modal">&times;</button>
                <div className="form-card" style={{ boxShadow: 'none', border: 'none', padding: '40px', margin: '0', width: '100%' }}>
                    <h2 className="form-title" style={{ marginBottom: '12px', fontSize: '24px' }}>Download Brochure</h2>
                    
                    {success ? (
                        <div className="success-state" style={{ textAlign: 'center', padding: '20px 0' }}>
                            <div style={{ fontSize: '40px', color: '#10B981', marginBottom: '15px' }}>✓</div>
                            <h3 style={{ fontFamily: "'Inter Display', sans-serif", fontSize: '20px', color: 'var(--text-primary)', marginBottom: '10px' }}>Request Received</h3>
                            <p style={{ fontFamily: 'var(--font-main)', fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                                Thank you! An agent will send your brochure to <strong>{email}</strong> shortly.
                            </p>
                        </div>
                    ) : (
                        <>
                            <p style={{ fontFamily: 'var(--font-main)', fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '24px', lineHeight: '1.5' }}>
                                Get instant access to floor plans, amenities, and pricing details. Provide your details below and we will email the brochure to you immediately.
                            </p>
                            
                            {error && (
                                <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#EF4444', padding: '12px 16px', fontSize: '13px', borderRadius: '4px', marginBottom: '20px', fontFamily: 'var(--font-main)' }}>
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="contact-form">
                                <div className="form-group">
                                    <label htmlFor="brochure-name">FULL NAME</label>
                                    <input 
                                        type="text" 
                                        id="brochure-name" 
                                        name="name" 
                                        placeholder="Jane Smith" 
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        disabled={submitting}
                                        required 
                                    />
                                </div>
                                
                                <div className="form-group">
                                    <label htmlFor="brochure-email">EMAIL ADDRESS</label>
                                    <input 
                                        type="email" 
                                        id="brochure-email" 
                                        name="email" 
                                        placeholder="jane@example.com" 
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        disabled={submitting}
                                        required 
                                    />
                                </div>
                                
                                <button 
                                    type="submit" 
                                    className="submit-btn" 
                                    disabled={submitting}
                                    style={{ width: '100%', marginTop: '20px' }}
                                >
                                    <div className="flip-text">
                                        <span>{submitting ? 'SENDING...' : 'SEND BROCHURE'}</span>
                                        <span aria-hidden="true">{submitting ? 'SENDING...' : 'SEND BROCHURE'}</span>
                                    </div>
                                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                                </button>
                                
                                <p style={{ fontSize: '11px', color: 'var(--text-secondary)', textAlign: 'center', marginTop: '15px', fontFamily: 'var(--font-main)' }}>
                                    By downloading, you agree to receive communications regarding Wisdom Kwati Smart City.
                                </p>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
