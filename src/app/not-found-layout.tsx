import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Page Not Found - Mid America Bathworks',
}

export default function NotFoundLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 