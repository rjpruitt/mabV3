import { Collection, EmailNotification } from '@/types/products'
import { testCollectionService, testEmailService } from '../services/test-service-provider'
import { CollectionService } from '../services/collection-service'
import { ProductService } from '../services/product-service'
import { EmailService } from '../services/email-service'

export async function createTestCollection(): Promise<Collection> {
  return testCollectionService.createCollection({
    name: 'Test Collection',
    description: 'Test collection for sharing',
    createdBy: {
      id: 'test-user',
      type: 'customer'
    },
    products: [],
    status: 'draft',
    isPublic: false
  })
}

export async function shareTestCollection(collectionId: string): Promise<void> {
  await testCollectionService.shareCollection(
    collectionId,
    'test@example.com',
    'view',
    24 // expires in 24 hours
  )
}

export function getLastNotification(): Promise<EmailNotification | undefined> {
  return testEmailService.getNotifications().then(notifications => 
    notifications[notifications.length - 1]
  )
}

export function createTestServices() {
  return {
    collectionService: new CollectionService(),
    productService: new ProductService(),
    emailService: new EmailService()
  }
} 