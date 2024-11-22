export interface SendGridConfig {
  toEmail: string
  templateId: string
  templateData?: Record<string, any>
  attachments?: Array<{
    content: string
    filename: string
    type: string
    disposition: 'attachment'
  }>
}

export interface EmailTemplate {
  id: string
  name: string
  subject: string
  content: string
} 