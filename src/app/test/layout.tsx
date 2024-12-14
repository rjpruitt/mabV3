import '@/app/globals.css'

export const metadata = {
  title: 'Test Environment',
  description: 'Testing notification functionality',
}

export default function TestLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-white pt-24">
      {children}
    </div>
  )
} 