import { Montserrat, PT_Serif, Dancing_Script, Playfair_Display_SC } from 'next/font/google'
import { Header } from '@/components/shared/header'
import { Footer } from '@/components/shared/footer/footer'
import { AccessibilityProvider } from '@/providers/accessibility-provider'
import { ErrorBoundary } from '@/components/ui/error-boundary'
import { SkipLink } from '@/components/ui/skip-link'

const montserrat = Montserrat({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat'
})

const ptSerif = PT_Serif({ 
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-pt-serif'
})

const dancingScript = Dancing_Script({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-dancing-script'
})

const playfairDisplaySC = Playfair_Display_SC({
  weight: ['400', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair-display-sc'
})

export default function PagesLayout({ children }: { children: React.ReactNode }) {
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
              className="focus:outline-none"
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