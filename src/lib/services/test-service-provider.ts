import { CollectionService } from './collection-service'
import { EmailService } from './email-service'

// Create test-specific instances that don't depend on auth
export const testCollectionService = new CollectionService()
export const testEmailService = new EmailService() 