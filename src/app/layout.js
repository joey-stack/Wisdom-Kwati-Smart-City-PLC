import { Outfit, Inter, Montserrat } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SiteVisitModal from "../components/SiteVisitModal";
import ClientScripts from "../components/ClientScripts";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  metadataBase: new URL('https://wisdomkwati.com'),
  title: {
    default: "Wisdom Kwati Smart City PLC | buy. sell. rent.",
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
    title: "Wisdom Kwati Smart City PLC | buy. sell. rent.",
    description: "Building the functional ecosystem Africa deserves. Explore our ultra-modern smart cities.",
    url: 'https://wisdomkwati.com',
    siteName: 'Wisdom Kwati Smart City',
    images: [
      {
        url: 'https://images.weserv.nl/?output=webp&q=80&url=drive.google.com/uc?id=1WkaEVNo0ii8zkmYXHDOd5MOFwDcz7VKi',
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
    title: "Wisdom Kwati Smart City PLC | buy. sell. rent.",
    description: "Building the functional ecosystem Africa deserves.",
    images: ['https://images.weserv.nl/?output=webp&q=80&url=drive.google.com/uc?id=1WkaEVNo0ii8zkmYXHDOd5MOFwDcz7VKi'],
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
    <html lang="en" className={`${outfit.variable} ${inter.variable} ${montserrat.variable}`}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Wisdom Kwati Smart City PLC",
              "alternateName": "WKSC PLC",
              "url": "https://wisdomkwati.com",
              "logo": "https://images.weserv.nl/?output=webp&q=80&url=drive.google.com/uc?id=1WkaEVNo0ii8zkmYXHDOd5MOFwDcz7VKi",
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
        <Header />
        
        {children}

        <Footer />
        <SiteVisitModal />
        <ClientScripts />

      </body>
    </html>
  );
}
