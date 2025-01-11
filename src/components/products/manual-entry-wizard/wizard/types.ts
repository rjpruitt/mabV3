import type { Supplier } from '@prisma/client'
import type { CatalogueFormData, ProductImage } from '@/lib/products/types/catalogue'

export interface ProductImageWithFile extends ProductImage {
  file?: File
  id: string
  url: string
  alt: string
  isPrimary: boolean
  source: 'supplier' | 'custom'
  visibility: {
    showToCustomer: boolean
    showToSalesRep: boolean
  }
}

export interface BasicInfoStepProps {
  data: CatalogueFormData
  onChange: (data: Partial<CatalogueFormData>) => void
  initialData?: Partial<CatalogueFormData>
  supplierList: Supplier[]
}

export interface ReviewStepProps {
  data: CatalogueFormData
  onChange: (data: Partial<CatalogueFormData>) => void
  onStepChange: (step: WizardStep) => void
  onComplete: (data: CatalogueFormData) => Promise<void>
}

export interface ImagesStepProps {
  data: CatalogueFormData
  onChange: (data: { images: ProductImage[] }) => void
}

export type WizardStep = 'basic' | 'category' | 'specifications' | 'images' | 'visibility' 