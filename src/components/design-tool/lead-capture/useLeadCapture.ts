import { useState } from 'react'
import { LeadInfo } from './types'

export function useLeadCapture() {
  const [isLeadCaptureOpen, setIsLeadCaptureOpen] = useState(false)
  const [leadCaptureTrigger, setLeadCaptureTrigger] = useState<'get-price' | 'save-design' | 'share-design' | 'consultation'>('get-price')

  const handleLeadCapture = async (leadInfo: LeadInfo) => {
    // TODO: Implement lead capture API call
    console.log('Lead captured:', leadInfo)
  }

  const openLeadCapture = (trigger: 'get-price' | 'save-design' | 'share-design' | 'consultation') => {
    setLeadCaptureTrigger(trigger)
    setIsLeadCaptureOpen(true)
  }

  return {
    isLeadCaptureOpen,
    leadCaptureTrigger,
    openLeadCapture,
    closeLeadCapture: () => setIsLeadCaptureOpen(false),
    handleLeadCapture
  }
} 