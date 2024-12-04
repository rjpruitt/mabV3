import { SendGridConfig } from '@/lib/integrations/sendgrid/types'
import { ResourceLead } from '@/types/resources'
import sgMail from '@sendgrid/mail'

const initializeSendGrid = () => {
  const apiKey = process.env.SENDGRID_API_KEY
  if (!apiKey?.startsWith('SG.')) {
    throw new Error('SendGrid API key is not configured correctly')
  }
  sgMail.setApiKey(apiKey)
  return sgMail
}

export async function sendResourceEmail(config: SendGridConfig) {
  try {
    const client = initializeSendGrid()
    console.log('SendGrid Config:', {
      apiKey: process.env.SENDGRID_API_KEY?.substring(0, 10) + '...',
      fromEmail: process.env.SENDGRID_FROM_EMAIL,
      toEmail: config.toEmail,
      templateId: config.templateId,
      templateData: config.templateData
    })

    const msg = {
      to: config.toEmail,
      from: {
        email: process.env.SENDGRID_FROM_EMAIL!,
        name: 'Mid America Bathworks'
      },
      subject: `Your Free ${config.templateData?.resourceName} from Mid America Bathworks`,
      templateId: config.templateId,
      dynamicTemplateData: config.templateData
    }

    console.log('Attempting to send resource email...')
    const [response] = await client.send(msg)
    console.log('SendGrid Response:', {
      statusCode: response.statusCode,
      headers: response.headers,
      body: response.body
    })
    
    return true
  } catch (error) {
    console.error('SendGrid Error Details:', error)
    throw error
  }
}

export async function sendNotificationEmail(lead: ResourceLead) {
  try {
    const client = initializeSendGrid()
    console.log('Sending notification email:', {
      toEmail: process.env.SALES_EMAIL,
      fromEmail: process.env.SENDGRID_FROM_EMAIL,
      lead
    })

    // Create HTML table for metadata
    const metadataHtml = lead.metadata ? 
      Object.entries(lead.metadata)
        .map(([key, value]) => {
          const formattedKey = key
            .split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')
          return `
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>${formattedKey}:</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">${value}</td>
            </tr>
          `
        })
        .join('') : ''

    const msg = {
      to: process.env.SALES_EMAIL!,
      from: {
        email: process.env.SENDGRID_FROM_EMAIL!,
        name: 'Website Notifications'
      },
      subject: `New Resource Download: ${lead.resourceType.replace(/-/g, ' ').toUpperCase()}`,
      html: `
        <h2>New Resource Download Lead</h2>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Name:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${lead.name}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Email:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${lead.email}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Phone:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${lead.phone || 'Not provided'}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Resource:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${lead.resourceType.replace(/-/g, ' ').toUpperCase()}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Time:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${new Date().toLocaleString()}</td>
          </tr>
          ${metadataHtml}
        </table>
      `
    }

    console.log('Attempting to send notification email with config:', msg)
    const [response] = await client.send(msg)
    console.log('Notification Email Response:', {
      statusCode: response.statusCode,
      headers: response.headers,
      body: response.body
    })
    
    return true
  } catch (error) {
    console.error('Notification Email Error Details:', error)
    throw error
  }
} 