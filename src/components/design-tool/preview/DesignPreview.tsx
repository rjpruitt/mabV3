'use client'

import Image from 'next/image'
import { DesignState } from '../storage/types'

type DesignPreviewProps = {
  design: DesignState
  showDimensions?: boolean
}

export function DesignPreview({ design, showDimensions }: DesignPreviewProps) {
  // Render a visual preview of the design
  // Could use 3D models or composite images
} 