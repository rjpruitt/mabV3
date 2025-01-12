/**
 * Service Provider
 * Singleton class that manages service instances and dependencies
 * Handles initialization and cleanup of database, repositories, and services
 */

import { PrismaClient } from '@prisma/client'
import { ProductRepository } from '../products/repositories/product.repository'
import { ProductImportService } from './product-import.service'
import { CasticoScraper } from './scraper/suppliers/castico'

export class ServiceProvider {
  private static instance: ServiceProvider
  private prisma: PrismaClient
  private productRepo: ProductRepository
  private casticoScraper: CasticoScraper | null = null
  private productImportService: ProductImportService | null = null

  private constructor() {
    this.prisma = new PrismaClient()
    this.productRepo = new ProductRepository(this.prisma)
  }

  public static getInstance(): ServiceProvider {
    if (!ServiceProvider.instance) {
      ServiceProvider.instance = new ServiceProvider()
    }
    return ServiceProvider.instance
  }

  getCasticoScraper(): CasticoScraper {
    if (!this.casticoScraper) {
      this.casticoScraper = new CasticoScraper(this)
    }
    return this.casticoScraper
  }

  getProductRepository(): ProductRepository {
    return this.productRepo
  }

  getProductImportService(): ProductImportService {
    if (!this.productImportService) {
      this.productImportService = new ProductImportService(this.prisma)
    }
    return this.productImportService
  }

  async cleanup() {
    if (this.casticoScraper) {
      await this.casticoScraper.cleanup()
    }
    await this.prisma.$disconnect()
  }
} 