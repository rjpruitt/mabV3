import type { Metadata } from "next";
import { Montserrat, Playfair_Display, Playfair_Display_SC, PT_Serif, DM_Sans, Dancing_Script } from 'next/font/google';
import "./globals.css";
import { Header } from '@/components/shared/header'
import { Footer } from '@/components/shared/footer/footer'

const montserrat = Montserrat({ 
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
});

const playfairDisplaySC = Playfair_Display_SC({
  subsets: ['latin'],
  variable: '--font-playfair-display-sc',
  display: 'swap',
  weight: ['400', '700', '900'],
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair-display',
  display: 'swap',
  weight: ['400', '500', '600', '700', '900'],
});

const ptSerif = PT_Serif({ 
  subsets: ['latin'],
  variable: '--font-pt-serif',
  display: 'swap',
  weight: ['400', '700'],
});

const dmSans = DM_Sans({ 
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const dancingScript = Dancing_Script({ 
  subsets: ['latin'],
  variable: '--font-dancing-script',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Mid America Bathworks | Expert Bathroom Remodeling & Renovation",
  description: "Transform your bathroom with Mid America Bathworks. Specializing in custom bathroom remodeling, tub-to-shower conversions, and accessible bathroom solutions. Free consultation available.",
  keywords: "bathroom remodeling, bathroom renovation, tub to shower conversion, bathroom contractors, accessible bathrooms",
  openGraph: {
    title: "Mid America Bathworks | Expert Bathroom Remodeling",
    description: "Transform your bathroom with expert renovation services. Free consultation available.",
    images: ['/path-to-og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://midamericabathworks.com'
  }
};

export const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HomeAndConstructionBusiness',
  '@id': 'https://midamericabathworks.com',
  name: 'Mid America Bathworks',
  image: 'https://midamericabathworks.com/path-to-logo.jpg',
  description: 'Expert bathroom remodeling and renovation services...',
  priceRange: '$$',
  telephone: '1-555-555-5555',
  address: {
    '@type': 'PostalAddress',
    // Add actual address details
  },
  geo: {
    '@type': 'GeoCoordinates',
    // Add actual coordinates
  },
  areaServed: [
    // Add service areas
  ],
  sameAs: [
    // Add social media URLs
  ]
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} ${playfairDisplaySC.variable} ${playfairDisplay.variable} ${ptSerif.variable} ${dmSans.variable} ${dancingScript.variable}`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
