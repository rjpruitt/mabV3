import { AccessibilityProvider } from '@/providers/accessibility-provider'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AccessibilityProvider>
          {children}
        </AccessibilityProvider>
      </body>
    </html>
  )
}
