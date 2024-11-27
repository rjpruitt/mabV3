import type { Metadata } from "next";
import { Montserrat, PT_Serif, Dancing_Script, Playfair_Display_SC } from 'next/font/google';
import "./globals.css";
import { Header } from '@/components/shared/header'
import { Footer } from '@/components/shared/footer/footer'
import { AccessibilityProvider } from '@/providers/accessibility-provider'
import { ErrorBoundary } from '@/components/ui/error-boundary'
import { SkipLink } from '@/components/ui/skip-link'

const montserrat = Montserrat({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat'
});

const ptSerif = PT_Serif({ 
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-pt-serif'
});

const dancingScript = Dancing_Script({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-dancing-script'
});

const playfairDisplaySC = Playfair_Display_SC({
  weight: ['400', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair-display-sc'
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
}: {
  children: React.ReactNode
}) {
  return (
    <html 
      lang="en" 
      className={`
        ${montserrat.variable}
        ${ptSerif.variable}
        ${dancingScript.variable}
        ${playfairDisplaySC.variable}
      `}
    >
      <body className={montserrat.className}>
        <Header />
        <AccessibilityProvider>
          <ErrorBoundary>
            <SkipLink />
            <main 
              id="main"
              tabIndex={-1}
              className="pt-[calc(var(--top-banner-height)+var(--nav-height))] focus:outline-none"
            >
              {children}
            </main>
            <Footer />
          </ErrorBoundary>
        </AccessibilityProvider>
      </body>
    </html>
  )
}
