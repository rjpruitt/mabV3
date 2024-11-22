import twilio from 'twilio'

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
)

export async function sendLeadNotification(lead: {
  name: string
  email: string
  phone?: string
  resourceType: string
}) {
  try {
    const message = await client.messages.create({
      body: `New Resource Download:
Name: ${lead.name}
Email: ${lead.email}
Phone: ${lead.phone || 'Not provided'}
Resource: ${lead.resourceType.replace(/-/g, ' ').toUpperCase()}`,
      from: process.env.TWILIO_FROM_NUMBER,
      to: process.env.TWILIO_TO_NUMBER!
    })

    console.log('SMS notification sent:', message.sid)
    return message
  } catch (error) {
    console.error('Twilio Error:', error)
    // Don't throw error to prevent disrupting the main flow
    return null
  }
} 