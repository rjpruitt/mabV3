import { Inter, PT_Serif, Dancing_Script, Playfair_Display_SC } from 'next/font/google'
import { Header } from '@/components/shared/header'
import { Footer } from '@/components/shared/footer/footer'
import type { NextFont } from 'next/dist/compiled/@next/font'

interface FontWithVariable extends NextFont {
  variable: string
}

const inter = Inter({ subsets: ['latin'] }) as FontWithVariable
const ptSerif = PT_Serif({ weight: '400', subsets: ['latin'] }) as FontWithVariable
const dancingScript = Dancing_Script({ subsets: ['latin'] }) as FontWithVariable
const playfairDisplaySC = Playfair_Display_SC({ weight: '400', subsets: ['latin'] }) as FontWithVariable

export default function PagesLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${ptSerif.variable} ${dancingScript.variable} ${playfairDisplaySC.variable}`}>
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
} 