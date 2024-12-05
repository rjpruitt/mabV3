import type { Metadata } from "next";
import { Montserrat, PT_Serif, Dancing_Script, Playfair_Display_SC } from 'next/font/google';
import "./globals.css";
import { Header } from '@/components/shared/header/header'
import { Footer } from '@/components/shared/footer/footer'
import { ClientWrapper } from '@/components/layouts/client-wrapper'

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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://midamericabathworks.com'),
  // ... keep existing metadata
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
        <main 
          id="main"
          tabIndex={-1}
          className="focus:outline-none"
        >
          <ClientWrapper>
            {children}
          </ClientWrapper>
        </main>
        <Footer />
      </body>
    </html>
  )
}
