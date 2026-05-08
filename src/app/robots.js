export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/_next/',
    },
    sitemap: 'https://wisdomkwati.com/sitemap.xml',
  }
}
