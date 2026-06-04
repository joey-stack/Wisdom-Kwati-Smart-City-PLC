/**
 * Resolves Google Drive image URLs to optimized weserv proxy URLs.
 * If the input URL is not a Google Drive link, it is returned unchanged.
 */
export const resolveMediaUrl = (url) => {
  if (!url) return '';
  if (typeof url !== 'string') return url;

  let finalUrl = url;

  // Intercept and extract raw Drive URL from pre-weserv proxy configurations
  if (url.includes('images.weserv.nl') && url.includes('drive.google.com')) {
    try {
      const urlObj = new URL(url);
      const innerUrl = urlObj.searchParams.get('url');
      if (innerUrl) {
        finalUrl = innerUrl;
      }
    } catch (e) {}
  }

  if (finalUrl.includes('drive.google.com')) {
    let fileId = '';
    
    // Format 1: /file/d/FILE_ID
    const matchD = finalUrl.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (matchD && matchD[1]) {
      fileId = matchD[1];
    } else {
      // Format 2: query parameters (id or docid)
      try {
        const cleanUrl = finalUrl.replace(/&amp;/g, '&');
        const urlObj = new URL(cleanUrl);
        fileId = urlObj.searchParams.get('id') || urlObj.searchParams.get('docid');
      } catch (e) {}
    }

    if (fileId) {
      // Fetch full original resolution and apply lanczos3 scaling + post-processing sharpen parameter
      return `https://images.weserv.nl/?url=${encodeURIComponent(`https://drive.google.com/uc?export=view&id=${fileId}`)}&w=1600&output=webp&q=90&sharp=1`;
    }
  }
  return url;
};
