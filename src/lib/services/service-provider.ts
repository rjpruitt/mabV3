import { CollectionService } from './collection-service'
import { ProductService } from './product-service'
import { EmailService } from './email-service'
import { UnwrangleService } from './unwrangle-service'
import { ProductsService } from './products-service'

export const collectionService = new CollectionService()
export const productService = new ProductService()
export const emailService = new EmailService()
export const unwrangleService = new UnwrangleService()
export const productsService = new ProductsService() 