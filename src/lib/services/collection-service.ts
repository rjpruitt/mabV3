import { Collection, CollectionShare, CollectionShareType } from '@/types/products'
import { EmailService } from './email-service'
import { supabase } from '@/lib/supabase'

const emailService = new EmailService()

export class CollectionService {
  private generateShareLink(collectionId: string, shareId: string): string {
    return `${process.env.NEXT_PUBLIC_BASE_URL}/shared/collections/${collectionId}?share=${shareId}`
  }

  async createCollection(data: Omit<Collection, 'id' | 'createdAt' | 'updatedAt'>) {
    const { data: collection, error } = await supabase
      .from('collections')
      .insert({
        name: data.name,
        description: data.description,
        created_by_id: data.createdBy.id,
        created_by_type: data.createdBy.type,
        status: data.status,
        is_public: data.isPublic,
        theme: data.theme,
        style: data.style
      })
      .select()
      .single()

    if (error) throw error

    // Insert products if any
    if (data.products?.length) {
      const { error: productsError } = await supabase
        .from('collection_products')
        .insert(
          data.products.map(product => ({
            collection_id: collection.id,
            product_id: product.productId,
            quantity: product.quantity,
            selected_options: product.selectedOptions
          }))
        )

      if (productsError) throw productsError
    }

    return this.mapCollectionFromDB(collection)
  }

  async shareCollection(
    collectionId: string,
    sharedWith: string,
    type: CollectionShareType = 'view',
    expiresIn?: number
  ): Promise<CollectionShare> {
    const expiresAt = expiresIn ? new Date(Date.now() + expiresIn * 60 * 60 * 1000) : undefined

    // Create share record
    const { data: share, error } = await supabase
      .from('collection_shares')
      .insert({
        collection_id: collectionId,
        shared_with: sharedWith,
        share_type: type,
        expires_at: expiresAt
      })
      .select()
      .single()

    if (error) throw error

    // Update collection status
    await supabase
      .from('collections')
      .update({ status: 'shared' })
      .eq('id', collectionId)

    // Send email notification if it's not a link share
    if (sharedWith !== 'link-share') {
      const shareUrl = this.generateShareLink(collectionId, share.id)
      const notification = await emailService.sendShareNotification(
        sharedWith,
        share.collection.name,
        shareUrl,
        share.id,
        collectionId,
        expiresAt
      )

      // Store notification
      await supabase
        .from('email_notifications')
        .insert({
          type: 'share',
          share_id: share.id,
          collection_id: collectionId,
          recipient: sharedWith,
          status: notification.status,
          error: notification.error
        })
    }

    return this.mapShareFromDB(share)
  }

  async getCollectionById(id: string) {
    const { data: collection, error } = await supabase
      .from('collections')
      .select(`
        *,
        products:collection_products(*),
        shares:collection_shares(
          *,
          notifications:email_notifications(*)
        )
      `)
      .eq('id', id)
      .single()

    if (error) throw error
    if (!collection) return null

    return this.mapCollectionFromDB(collection)
  }

  async listCollections(
    userId: string,
    type: 'customer' | 'staff',
    filters?: {
      status?: Collection['status']
      isPublic?: boolean
    }
  ) {
    let query = supabase
      .from('collections')
      .select(`
        *,
        products:collection_products(*),
        shares:collection_shares(*)
      `)
      .eq('created_by_id', userId)
      .eq('created_by_type', type)

    if (filters?.status) {
      query = query.eq('status', filters.status)
    }
    if (filters?.isPublic !== undefined) {
      query = query.eq('is_public', filters.isPublic)
    }

    const { data: collections, error } = await query

    if (error) throw error
    return collections.map(this.mapCollectionFromDB)
  }

  async updateCollection(
    id: string,
    updates: Partial<Omit<Collection, 'id' | 'createdAt' | 'updatedAt'>>
  ) {
    const { data: collection, error } = await supabase
      .from('collections')
      .update({
        name: updates.name,
        description: updates.description,
        status: updates.status,
        is_public: updates.isPublic,
        theme: updates.theme,
        style: updates.style
      })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    // Update products if provided
    if (updates.products) {
      // Delete existing products
      await supabase
        .from('collection_products')
        .delete()
        .eq('collection_id', id)

      // Insert new products
      if (updates.products.length) {
        const { error: productsError } = await supabase
          .from('collection_products')
          .insert(
            updates.products.map(product => ({
              collection_id: id,
              product_id: product.productId,
              quantity: product.quantity,
              selected_options: product.selectedOptions
            }))
          )

        if (productsError) throw productsError
      }
    }

    return this.mapCollectionFromDB(collection)
  }

  async deleteCollection(id: string) {
    const { error } = await supabase
      .from('collections')
      .delete()
      .eq('id', id)

    if (error) throw error
  }

  private mapCollectionFromDB(dbCollection: any): Collection {
    return {
      id: dbCollection.id,
      name: dbCollection.name,
      description: dbCollection.description,
      createdBy: {
        id: dbCollection.created_by_id,
        type: dbCollection.created_by_type,
      },
      products: dbCollection.products?.map((p: any) => ({
        productId: p.product_id,
        quantity: p.quantity,
        selectedOptions: p.selected_options
      })) ?? [],
      status: dbCollection.status,
      isPublic: dbCollection.is_public,
      createdAt: new Date(dbCollection.created_at),
      updatedAt: new Date(dbCollection.updated_at),
      theme: dbCollection.theme,
      style: dbCollection.style,
      shares: dbCollection.shares?.map(this.mapShareFromDB)
    }
  }

  private mapShareFromDB(dbShare: any): CollectionShare {
    return {
      id: dbShare.id,
      collectionId: dbShare.collection_id,
      sharedBy: dbShare.shared_by,
      sharedWith: dbShare.shared_with,
      type: dbShare.share_type,
      createdAt: new Date(dbShare.created_at),
      expiresAt: dbShare.expires_at ? new Date(dbShare.expires_at) : undefined,
      lastWarningAt: dbShare.last_warning_at ? new Date(dbShare.last_warning_at) : undefined,
      notifications: dbShare.notifications?.map(this.mapNotificationFromDB)
    }
  }

  private mapNotificationFromDB(dbNotification: any) {
    return {
      id: dbNotification.id,
      type: dbNotification.type,
      shareId: dbNotification.share_id,
      collectionId: dbNotification.collection_id,
      recipient: dbNotification.recipient,
      sentAt: new Date(dbNotification.sent_at),
      status: dbNotification.status,
      error: dbNotification.error
    }
  }

  async removeShare(collectionId: string, shareId: string): Promise<void> {
    // Get share details before removal
    const { data: share, error: shareError } = await supabase
      .from('collection_shares')
      .select('*, collection:collections(name)')
      .eq('id', shareId)
      .single()

    if (shareError) throw shareError

    // Send removal notification if not a link share
    if (share.shared_with !== 'link-share') {
      const notification = await emailService.sendShareRemovalNotification(
        share.shared_with,
        share.collection.name
      )

      // Store notification
      await supabase
        .from('email_notifications')
        .insert({
          type: 'removal',
          share_id: shareId,
          collection_id: collectionId,
          recipient: share.shared_with,
          status: 'sent',
          error: null
        })
    }

    // Delete the share
    const { error: deleteError } = await supabase
      .from('collection_shares')
      .delete()
      .eq('id', shareId)

    if (deleteError) throw deleteError

    // Check if collection has any remaining shares
    const { count, error: countError } = await supabase
      .from('collection_shares')
      .select('*', { count: 'exact', head: true })
      .eq('collection_id', collectionId)

    if (countError) throw countError

    // Update collection status if no shares remain
    if (count === 0) {
      await supabase
        .from('collections')
        .update({ status: 'draft' })
        .eq('id', collectionId)
    }
  }

  async hasAccess(
    userId: string,
    collectionId: string,
    requiredType: CollectionShareType = 'view'
  ): Promise<boolean> {
    // Check if user is owner
    const { data: collection, error: collectionError } = await supabase
      .from('collections')
      .select('created_by_id, is_public')
      .eq('id', collectionId)
      .single()

    if (collectionError) throw collectionError
    if (!collection) return false

    // Owner has full access
    if (collection.created_by_id === userId) return true

    // Public collections are viewable by anyone
    if (collection.is_public && requiredType === 'view') return true

    // Check shares
    const { data: share, error: shareError } = await supabase
      .from('collection_shares')
      .select('share_type, expires_at')
      .eq('collection_id', collectionId)
      .eq('shared_with', userId)
      .maybeSingle()

    if (shareError) throw shareError
    if (!share) return false

    // Check if share has expired
    if (share.expires_at && new Date(share.expires_at) < new Date()) return false

    // Check share type
    return requiredType === 'view' || share.share_type === 'edit'
  }

  async updateProductQuantity(
    collectionId: string,
    productId: string,
    quantity: number
  ) {
    const { data: product, error } = await supabase
      .from('collection_products')
      .update({ quantity })
      .eq('collection_id', collectionId)
      .eq('product_id', productId)
      .select()
      .single()

    if (error) throw error

    // Get updated collection
    return this.getCollectionById(collectionId)
  }

  async checkShareExpirations(): Promise<void> {
    const warningThreshold = 24 * 60 * 60 * 1000 // 24 hours in milliseconds
    const now = new Date()

    // Get shares expiring soon
    const { data: shares, error } = await supabase
      .from('collection_shares')
      .select(`
        *,
        collection:collections(name)
      `)
      .neq('shared_with', 'link-share')
      .gt('expires_at', now.toISOString())
      .lt('expires_at', new Date(now.getTime() + warningThreshold).toISOString())
      .is('last_warning_at', null)

    if (error) throw error

    // Send warnings for each share
    for (const share of shares) {
      const shareUrl = this.generateShareLink(share.collection_id, share.id)
      const notification = await emailService.sendExpirationWarning(
        share.shared_with,
        share.collection.name,
        shareUrl,
        new Date(share.expires_at)
      )

      // Store notification and update last warning time
      await Promise.all([
        supabase
          .from('email_notifications')
          .insert({
            type: 'expiration_warning',
            share_id: share.id,
            collection_id: share.collection_id,
            recipient: share.shared_with,
            status: 'sent',
            error: null
          }),
        supabase
          .from('collection_shares')
          .update({ last_warning_at: now.toISOString() })
          .eq('id', share.id)
      ])
    }
  }

  async updateShare(shareId: string, updates: {
    expiresAt?: Date
    type?: CollectionShareType
  }): Promise<CollectionShare> {
    try {
      const { data, error } = await supabase
        .from('collection_shares')
        .update({ 
          expiresAt: updates.expiresAt || undefined,
          type: updates.type,
          updatedAt: new Date()
        })
        .eq('id', shareId)
        .select()
        .single()

      if (error) throw error

      return this.mapShareFromDB(data)
    } catch (error) {
      console.error('Failed to update share:', error)
      throw error
    }
  }
} 