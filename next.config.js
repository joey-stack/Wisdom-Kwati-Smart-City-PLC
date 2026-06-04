/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable gzip/brotli compression for all responses
  compress: true,

  // Allow Next.js Image component to optimise images from these origins
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.weserv.nl' },
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
      { protocol: 'https', hostname: 'drive.google.com' },
      { protocol: 'https', hostname: 'ui-avatars.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },

  async redirects() {
    return [
      { source: '/index.html', destination: '/', permanent: true },

      // Legacy updates HTML pages directly mapped to dynamic project pages
      { source: '/beverly-hills-updates.html', destination: '/projects/beverly-hills', permanent: true },
      { source: '/karsana-district-updates.html', destination: '/projects/karsana-district', permanent: true },
      { source: '/palm-haven-updates.html', destination: '/projects/palm-haven', permanent: true },
      { source: '/murg-city-updates.html', destination: '/projects/murg-city', permanent: true },
      { source: '/lakeside-view-updates.html', destination: '/projects/lakeside-view', permanent: true },
      { source: '/royal-city-updates.html', destination: '/projects/royal-city', permanent: true },
      { source: '/usulo-city-updates.html', destination: '/projects/usulo-city', permanent: true },
      { source: '/wisdom-kwati-smart-city-updates.html', destination: '/projects/wisdom-kwati-smart-city', permanent: true },
      { source: '/epe-smart-city-updates.html', destination: '/projects/epe-smart-city', permanent: true },
      { source: '/gousa-idu-district-updates.html', destination: '/projects/gousa-idu-district', permanent: true },
      { source: '/mabushi-district-updates.html', destination: '/projects/mabushi-district', permanent: true },
      { source: '/guzape-estate-updates.html', destination: '/projects/guzape-estate', permanent: true },
      { source: '/port-harcourt-estate-updates.html', destination: '/projects/port-harcourt-estate', permanent: true },
      { source: '/hof-community-updates.html', destination: '/projects/hof-community', permanent: true },
      { source: '/maitama-district-updates.html', destination: '/projects/maitama-district', permanent: true },
      { source: '/fintiri-extension-updates.html', destination: '/projects/fintiri-extension', permanent: true },
      { source: '/katampe-extension-updates.html', destination: '/projects/katampe-extension', permanent: true },
      { source: '/kaduna-smart-district-updates.html', destination: '/projects/kaduna-smart-district', permanent: true },
      { source: '/sunbrook-estate-updates.html', destination: '/projects/sunbrook-estate', permanent: true },

      // Project updates directories mapped to dynamic project detail pages
      {
        source: '/:slug(beverly-hills|epe-smart-city|fintiri-extension|gousa-idu-district|guzape-estate|hof-community|kaduna-smart-district|karsana-district|katampe-extension|lakeside-view|mabushi-district|maitama-district|murg-city|murg-city-exclusive|palm-haven|port-harcourt-estate|royal-city|sunbrook-estate|usulo-city|wisdom-kwati-smart-city)/updates',
        destination: '/projects/:slug',
        permanent: true
      },

      // Project clean URLs mapped to dynamic project detail pages
      {
        source: '/:slug(beverly-hills|epe-smart-city|fintiri-extension|gousa-idu-district|guzape-estate|hof-community|kaduna-smart-district|karsana-district|katampe-extension|lakeside-view|mabushi-district|maitama-district|murg-city|murg-city-exclusive|palm-haven|port-harcourt-estate|royal-city|sunbrook-estate|usulo-city|wisdom-kwati-smart-city)',
        destination: '/projects/:slug',
        permanent: true
      },

      // House type clean URLs mapped to dynamic specification pages
      {
        source: '/:slug(blue-sapphire|imperial-emerald|jade-terrace|royal-emerald|silver-pearl|star-sapphire|white-pearl)',
        destination: '/house-types/:slug',
        permanent: true
      },

      // Generic .html to clean URL
      { source: '/:path*.html', destination: '/:path*', permanent: true },
    ];
  },

  async headers() {
    if (process.env.NODE_ENV === 'development') {
      return [
        {
          // Cache immutable public assets for 1 year
          source: '/assets/:path*',
          headers: [
            { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
          ],
        },
      ];
    }
    return [
      {
        // Cache immutable public assets for 1 year
        source: '/assets/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        // Cache fonts served by Next.js for 1 year
        source: '/_next/static/media/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        // Cache static JS/CSS chunks for 1 year (hashed filenames = safe)
        source: '/_next/static/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;

