/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  async redirects() {
    return [
      { source: '/index.html', destination: '/', permanent: true },
      // Estate Updates Mapping
      { source: '/beverly-hills-updates.html', destination: '/beverly-hills/updates', permanent: true },
      { source: '/karsana-district-updates.html', destination: '/karsana-district/updates', permanent: true },
      { source: '/palm-haven-updates.html', destination: '/palm-haven/updates', permanent: true },
      { source: '/murg-city-updates.html', destination: '/murg-city/updates', permanent: true },
      { source: '/lakeside-view-updates.html', destination: '/lakeside-view/updates', permanent: true },
      { source: '/royal-city-updates.html', destination: '/royal-city/updates', permanent: true },
      { source: '/usulo-city-updates.html', destination: '/usulo-city/updates', permanent: true },
      { source: '/wisdom-kwati-smart-city-updates.html', destination: '/wisdom-kwati-smart-city/updates', permanent: true },
      { source: '/epe-smart-city-updates.html', destination: '/epe-smart-city/updates', permanent: true },
      { source: '/gousa-idu-district-updates.html', destination: '/gousa-idu-district/updates', permanent: true },
      { source: '/mabushi-district-updates.html', destination: '/mabushi-district/updates', permanent: true },
      { source: '/guzape-estate-updates.html', destination: '/guzape-estate/updates', permanent: true },
      { source: '/port-harcourt-estate-updates.html', destination: '/port-harcourt-estate/updates', permanent: true },
      { source: '/hof-community-updates.html', destination: '/hof-community/updates', permanent: true },
      { source: '/maitama-district-updates.html', destination: '/maitama-district/updates', permanent: true },
      { source: '/fintiri-extension-updates.html', destination: '/fintiri-extension/updates', permanent: true },
      { source: '/katampe-extension-updates.html', destination: '/katampe-extension/updates', permanent: true },
      { source: '/kaduna-smart-district-updates.html', destination: '/kaduna-smart-district/updates', permanent: true },
      { source: '/sunbrook-estate-updates.html', destination: '/sunbrook-estate/updates', permanent: true },
      
      // Generic .html to clean URL
      { source: '/:path*.html', destination: '/:path*', permanent: true },
    ];
  },
};

module.exports = nextConfig;
