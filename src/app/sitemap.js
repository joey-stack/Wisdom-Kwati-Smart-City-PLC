export default function sitemap() {
  const baseUrl = 'https://wisdomkwatismartcityplc.com';

  // Core Pages
  const routes = [
    '',
    '/about',
    '/projects',
    '/house-types',
    '/contact',
    '/faqs',
    '/blogs',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));

  // District & Project Pages
  const projects = [
    '/projects/wisdom-kwati-smart-city',
    '/projects/guzape-estate',
    '/projects/katampe-extension',
    '/projects/mabushi-district',
    '/projects/karsana-district',
    '/projects/palm-haven',
    '/projects/lakeside-view',
    '/projects/royal-city',
    '/projects/epe-smart-city',
    '/projects/kaduna-smart-district',
    '/projects/gousa-idu-district',
    '/projects/port-harcourt-estate',
    '/projects/sunset-haven',
    '/projects/murg-city-exclusive',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  // House Types
  const houses = [
    '/house-types/blue-sapphire',
    '/house-types/imperial-emerald',
    '/house-types/jade-terrace',
    '/house-types/royal-emerald',
    '/house-types/silver-pearl',
    '/house-types/star-sapphire',
    '/house-types/white-pearl',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...routes, ...projects, ...houses];
}
