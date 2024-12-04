// import twilio from 'twilio'

export async function sendLeadNotification(lead: {
  name: string
  email: string
  phone?: string
  resourceType: string
}) {
  // Temporarily disabled until Twilio implementation is ready
  console.log('Twilio notifications not yet implemented')
  return null
} 