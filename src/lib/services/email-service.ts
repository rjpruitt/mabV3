import { EmailNotification } from '@/types/products'
import { supabase } from '@/lib/supabase'

// Mock storage for email notifications
const mockEmailNotifications: EmailNotification[] = []

export interface EmailOptions {
  to: string
  subject: string
  body: string
}

export class EmailService {
  // Mock implementation for testing
  async sendEmail(options: EmailOptions): Promise<void> {
    // In production, this would connect to an email service
    console.log('Sending email:', {
      to: options.to,
      subject: options.subject,
      body: options.body
    })
  }

  private async trackNotification(
    type: EmailNotification['type'],
    shareId: string,
    collectionId: string,
    recipient: string,
    error?: string
  ): Promise<EmailNotification> {
    const notification: EmailNotification = {
      id: `email-${Date.now()}`,
      type,
      shareId,
      collectionId,
      recipient,
      sentAt: new Date(),
      status: error ? 'failed' : 'sent',
      error
    }

    mockEmailNotifications.push(notification)
    return notification
  }

  async sendShareNotification(
    to: string,
    collectionName: string,
    shareUrl: string,
    shareId: string,
    collectionId: string,
    expiresAt?: Date
  ): Promise<EmailNotification> {
    try {
      await this.sendEmail({
        to,
        subject: `Collection "${collectionName}" has been shared with you`,
        body: `
          Someone has shared their collection "${collectionName}" with you.
          
          View the collection here: ${shareUrl}
          ${expiresAt ? `\n\nThis share link will expire on ${expiresAt.toLocaleDateString()}` : ''}
        `.trim()
      })

      return this.trackNotification('share', shareId, collectionId, to)
    } catch (err) {
      const error = err instanceof Error ? err.message : 'Failed to send email'
      return this.trackNotification('share', shareId, collectionId, to, error)
    }
  }

  async sendShareRemovalNotification(
    to: string,
    collectionName: string
  ): Promise<void> {
    await this.sendEmail({
      to,
      subject: `Access removed: Collection "${collectionName}"`,
      body: `
        Your access to the collection "${collectionName}" has been removed.
        
        If you believe this is a mistake, please contact the collection owner.
      `.trim()
    })
  }

  async sendExpirationWarning(
    to: string,
    collectionName: string,
    shareUrl: string,
    expiresAt: Date
  ): Promise<void> {
    await this.sendEmail({
      to,
      subject: `Access expiring soon: Collection "${collectionName}"`,
      body: `
        Your access to the collection "${collectionName}" will expire on ${expiresAt.toLocaleDateString()}.
        
        View the collection here before it expires: ${shareUrl}
        
        To maintain access, please contact the collection owner.
      `.trim()
    })
  }

  async getNotifications(filters?: {
    shareId?: string
    collectionId?: string
    recipient?: string
    type?: EmailNotification['type']
    status?: EmailNotification['status']
  }): Promise<EmailNotification[]> {
    return mockEmailNotifications.filter(notification => {
      if (filters?.shareId && notification.shareId !== filters.shareId) return false
      if (filters?.collectionId && notification.collectionId !== filters.collectionId) return false
      if (filters?.recipient && notification.recipient !== filters.recipient) return false
      if (filters?.type && notification.type !== filters.type) return false
      if (filters?.status && notification.status !== filters.status) return false
      return true
    })
  }

  async resendNotification(notificationId: string): Promise<EmailNotification> {
    const notification = mockEmailNotifications.find(n => n.id === notificationId)
    if (!notification) throw new Error('Notification not found')

    // Re-send based on notification type
    switch (notification.type) {
      case 'share':
        throw new Error('Resending share notifications not implemented')
      case 'removal':
        throw new Error('Resending removal notifications not implemented')
      case 'expiration_warning':
        throw new Error('Resending expiration warnings not implemented')
      default:
        throw new Error('Unknown notification type')
    }
  }

  async getNotificationsByShareId(shareId: string): Promise<EmailNotification[]> {
    const { data, error } = await supabase
      .from('email_notifications')
      .select('*')
      .eq('share_id', shareId)
      .order('sent_at', { ascending: false })

    if (error) throw error
    return data || []
  }
} 