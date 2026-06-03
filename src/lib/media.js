/**
 * Resolves Google Drive image URLs to optimized weserv proxy URLs.
 * If the input URL is not a Google Drive link, it is returned unchanged.
 */
export const resolveMediaUrl = (url) => {
  if (!url) return '';
  if (typeof url !== 'string') return url;

  if (url.includes('drive.google.com')) {
    let fileId = '';
    const match = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      fileId = match[1];
    } else {
      try {
        const urlObj = new URL(url);
        fileId = urlObj.searchParams.get('id');
      } catch (e) {}
    }
    
    if (fileId) {
      return `https://images.weserv.nl/?url=${encodeURIComponent(`https://drive.google.com/uc?export=view&id=${fileId}`)}&w=1600&output=webp&q=85`;
    }
  }
  return url;
};
