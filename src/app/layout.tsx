import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter"
});

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-playfair"
});

export const metadata: Metadata = {
  title: {
    default: "Sweet Dreams Production | Cinematic Content That Converts",
    template: "%s | Sweet Dreams Production"
  },
  description: "Masters of cinematic content and 2025 social media strategy. Premium B2B video production for ambitious brands. From $3,500 corporate videos to $50,000+ commercial campaigns. Serving Fort Wayne, Chicago, Indianapolis & nationwide.",
  keywords: "corporate video production fort wayne, midwest commercial production company, B2B video content agency indiana, healthcare video marketing, museum virtual tour production, brand story films, social media strategy 2025, video marketing agency, cinematic content creation",
  authors: [{ name: "Sweet Dreams Production" }, { name: "Jay Val Leo" }, { name: "Cole Marcuccilli" }],
  creator: "Sweet Dreams Production",
  publisher: "Sweet Dreams Music LLC",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://sweetdreamsprod.com",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sweetdreamsprod.com",
    title: "Sweet Dreams Production | Cinematic Content That Converts",
    description: "Masters of cinematic content and 2025 social media strategy. Premium B2B video production company specializing in corporate films, commercial content, and brand storytelling.",
    siteName: "Sweet Dreams Production",
    images: [
      {
        url: "https://fweeyjnqwxywmpmnqpts.supabase.co/storage/v1/object/public/media/logos/sweetDreamsProdlogo.png",
        width: 1200,
        height: 630,
        alt: "Sweet Dreams Production - Video Production Company",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sweet Dreams Production | Cinematic Content That Converts",
    description: "Masters of cinematic content and 2025 social media strategy. Premium B2B video production for ambitious brands.",
    images: ["https://fweeyjnqwxywmpmnqpts.supabase.co/storage/v1/object/public/media/logos/sweetDreamsProdlogo.png"],
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
  category: "business",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      {/* Google Analytics */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-GVMKX38S4M"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-GVMKX38S4M');
        `}
      </Script>

      {/* Structured Data for Local Business */}
      <Script
        id="structured-data"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Sweet Dreams Production",
            "description": "Masters of cinematic content and 2025 social media strategy. Premium B2B video production company.",
            "url": "https://sweetdreamsprod.com",
            "logo": "https://fweeyjnqwxywmpmnqpts.supabase.co/storage/v1/object/public/media/logos/sweetDreamsProdlogo.png",
            "image": "https://fweeyjnqwxywmpmnqpts.supabase.co/storage/v1/object/public/media/logos/sweetDreamsProdlogo.png",
            "telephone": "+1-260-450-7739",
            "email": "jayvalleo@sweetdreamsmusic.com",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "3943 Parnell Ave",
              "addressLocality": "Fort Wayne",
              "addressRegion": "IN",
              "postalCode": "46805",
              "addressCountry": "US"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "41.0883",
              "longitude": "-85.1394"
            },
            "openingHours": "Mo-Fr 09:00-18:00",
            "serviceArea": {
              "@type": "GeoCircle",
              "geoMidpoint": {
                "@type": "GeoCoordinates",
                "latitude": "41.0883",
                "longitude": "-85.1394"
              },
              "geoRadius": "500000"
            },
            "services": [
              "Corporate Video Production",
              "Commercial Video Production",
              "Social Media Content Creation",
              "Brand Story Films",
              "Event Coverage",
              "Marketing Strategy"
            ],
            "priceRange": "$3500-$50000",
            "paymentAccepted": ["Cash", "Credit Card", "Check"],
            "foundingDate": "2020",
            "founder": [
              {
                "@type": "Person",
                "name": "Jay Val Leo"
              },
              {
                "@type": "Person",
                "name": "Cole Marcuccilli"
              }
            ]
          })
        }}
      />

      <body className={`${inter.className} bg-black text-white antialiased min-h-screen`}>
        <div className="relative">
          {/* Subtle grain texture overlay */}
          <div className="fixed inset-0 opacity-5 pointer-events-none z-0 bg-noise" />
          
          {/* Main content */}
          <div className="relative z-10">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
