import { sendResourceEmail, sendNotificationEmail } from '@/lib/integrations/sendgrid'
import { sendLeadNotification } from '@/lib/integrations/twilio'
import { appendLeadToSheet } from '@/lib/integrations/sheets'
import { resources } from '@/config/resources'
import { ResourceLead } from '@/types/resources'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    console.log('Received lead submission request')
    
    const lead = (await req.json()) as ResourceLead & { resourceType: keyof typeof resources }
    console.log('Lead data:', JSON.stringify(lead, null, 2))
    
    const resource = resources[lead.resourceType]
    if (!resource) {
      console.error('Invalid resource type:', lead.resourceType)
      return NextResponse.json(
        { error: 'Invalid resource type' },
        { status: 400 }
      )
    }

    try {
      // Send resource email to user
      console.log('Sending resource email to:', lead.email)
      await sendResourceEmail({
        toEmail: lead.email,
        templateId: resource.emailTemplate,
        templateData: {
          firstName: lead.name.split(' ')[0],
          resourceName: resource.title
        }
      })
      console.log('Resource email sent successfully')

      // Send notification email
      console.log('Sending notification email')
      await sendNotificationEmail(lead)
      console.log('Notification email sent successfully')

      // Send SMS notification
      if (process.env.TWILIO_ACCOUNT_SID) {
        console.log('Sending SMS notification')
        await sendLeadNotification(lead)
        console.log('SMS notification sent successfully')
      }

    } catch (error) {
      console.error('Notification Error:', error)
      if (error instanceof Error) {
        console.error('Error details:', {
          message: error.message,
          stack: error.stack,
          name: error.name
        })
      }
      throw error
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Lead submission error:', error)
    if (error instanceof Error) {
      console.error('Full error details:', {
        message: error.message,
        stack: error.stack,
        name: error.name
      })
    }
    return NextResponse.json(
      { 
        error: 'Failed to process lead', 
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    )
  }
}