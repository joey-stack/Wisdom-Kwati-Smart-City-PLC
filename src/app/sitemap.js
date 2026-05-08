export default function sitemap() {
  const baseUrl = 'https://wisdomkwati.com';

  // Core Pages
  const routes = [
    '',
    '/about',
    '/projects',
    '/house-types',
    '/contact',
    '/faqs',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));

  // District & Project Pages
  const projects = [
    '/wisdom-kwati-smart-city',
    '/guzape-estate',
    '/katampe-extension',
    '/mabushi-district',
    '/karsana-district',
    '/palm-haven',
    '/lakeside-view',
    '/royal-city',
    '/epe-smart-city',
    '/kaduna-smart-district',
    '/gousa-idu-district',
    '/port-harcourt-estate',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  // House Types
  const houses = [
    '/emerald-villa',
    '/sapphire-terrace',
    '/diamond-duplex',
    '/topaz-semi',
    '/onyx-flats',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...routes, ...projects, ...houses];
}
