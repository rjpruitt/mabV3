import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export default function Custom404() {
  // Redirect to home on 404s
  redirect('/')
} 