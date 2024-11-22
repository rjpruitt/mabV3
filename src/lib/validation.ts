export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function isValidPhone(phone: string): boolean {
  // Allow empty as phone is optional
  if (!phone) return true
  
  // Should match (XXX) XXX-XXXX
  const phoneRegex = /^\(\d{3}\)\s\d{3}-\d{4}$/
  return phoneRegex.test(phone)
} 