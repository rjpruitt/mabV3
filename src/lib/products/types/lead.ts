/**
 * Lead Management Types
 * Type definitions for sales leads and user management
 * 
 * Core Types:
 * - Lead: Sales lead with contact info and status
 * - User: System user with role-based access
 * 
 * Status Flow:
 * NEW -> CONTACTED -> APPOINTMENT_SET -> QUOTED -> SOLD/LOST
 * 
 * User Roles:
 * - CUSTOMER: End users with saved designs
 * - SALES_REP: Sales team members
 * - ADMIN: System administrators
 * 
 * Features:
 * - Lead status tracking
 * - Design association
 * - Contact management
 * - Role-based permissions
 */

import { SavedDesign } from './design'

export interface Lead {
  id: string
  userId?: string
  name: string
  email: string
  phone: string
  zipCode: string
  projectTimeframe: string
  status: LeadStatus
  source: string
  createdAt: Date
  updatedAt: Date
  savedDesign?: SavedDesign
}

export enum LeadStatus {
  NEW = 'NEW',
  CONTACTED = 'CONTACTED',
  APPOINTMENT_SET = 'APPOINTMENT_SET',
  QUOTED = 'QUOTED',
  SOLD = 'SOLD',
  LOST = 'LOST'
}

export interface User {
  id: string
  email: string
  name?: string
  phone?: string
  zipCode?: string
  role: UserRole
  createdAt: Date
  updatedAt: Date
}

export enum UserRole {
  CUSTOMER = 'CUSTOMER',
  SALES_REP = 'SALES_REP',
  ADMIN = 'ADMIN'
} 