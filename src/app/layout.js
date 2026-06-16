import "./globals.css";
import Header from "../components/Header";
import { Analytics } from "@vercel/analytics/next";

import Footer from "../components/Footer";
import dynamic from "next/dynamic";

const SiteVisitModal = dynamic(() => import("../components/SiteVisitModal"));
const ConsultationModal = dynamic(() => import("../components/ConsultationModal"));
const ClientScripts = dynamic(() => import("../components/ClientScripts"));
import FontAwesomeLoader from "../components/FontAwesomeLoader";
import BraveShieldFix from "../components/BraveShieldFix";

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata = {
  metadataBase: new URL('https://wisdomkwatismartcityplc.com'),
  title: {
    default: "Wisdom Kwati Smart City PLC",
    template: "%s | Wisdom Kwati Smart City"
  },
  description: "Dream large. Live smart. We are building the functional ecosystem Africa deserves with ultra-modern smart cities across Nigeria.",
  keywords: ["smart city nigeria", "real estate abuja", "luxury homes nigeria", "wisdom kwati", "buy house abuja", "property investment nigeria"],
  authors: [{ name: "Wisdom Kwati Smart City PLC" }],
  creator: "Wisdom Kwati Smart City PLC",
  publisher: "Wisdom Kwati Smart City PLC",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Wisdom Kwati Smart City PLC",
    description: "Building the functional ecosystem Africa deserves. Explore our ultra-modern smart cities.",
    url: 'https://wisdomkwatismartcityplc.com',
    siteName: 'Wisdom Kwati Smart City',
    images: [
      {
        url: 'https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1WkaEVNo0ii8zkmYXHDOd5MOFwDcz7VKi%26sz=w1200',
        width: 1200,
        height: 630,
        alt: 'Wisdom Kwati Smart City Hero View',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Wisdom Kwati Smart City PLC",
    description: "Building the functional ecosystem Africa deserves.",
    images: ['https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1WkaEVNo0ii8zkmYXHDOd5MOFwDcz7VKi%26sz=w1200'],
  },
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Load Google Fonts directly */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700&family=Inter:wght@400;500;600;700&family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet" />
        {/* DNS-prefetch for image CDNs used on inner pages (non-critical) */}
        <link rel="dns-prefetch" href="https://images.weserv.nl" />
        <link rel="dns-prefetch" href="https://lh3.googleusercontent.com" />
        <script
          suppressHydrationWarning
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Wisdom Kwati Smart City PLC",
              "alternateName": "WKSC PLC",
              "url": "https://wisdomkwatismartcityplc.com",
              "logo": "https://images.weserv.nl/?url=https%3A%2F%2Fdrive.google.com%2Fuc%3Fexport%3Dview%26id%3D1cbeI43eSomsIyWb9SI50mmm6L49OAF-g",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+234-800-WISDOM",
                "contactType": "customer service",
                "email": "hello@wisdomkwatismartcity.com",
                "areaServed": "NG",
                "availableLanguage": ["en"]
              },
              "sameAs": [
                "https://www.linkedin.com/company/wisdom-kwati-smart-city",
                "https://www.facebook.com/wisdomkwatismartcity",
                "https://www.instagram.com/wisdomkwatismartcity"
              ]
            })
          }}
        />
      </head>
      <body suppressHydrationWarning>
        {/* Strip bis_skin_checked attributes injected by Brave browser/extensions before React hydrates to prevent console hydration errors */}
        <BraveShieldFix />
        <Header />

        {children}

        <div className="defer-render">
          <Footer />
        </div>
        <SiteVisitModal />
        <ConsultationModal />
        <ClientScripts />
        {/* Font Awesome loads asynchronously — not on the critical path */}
        <FontAwesomeLoader />
        <Analytics />

      </body>
    </html>
  );
}
