'use client'

import { usePathname } from 'next/navigation'
import { Header as MainHeader } from './header'
import { CampaignHeader } from '@/components/smart-solutions/campaign-header'

export function Header() {
  const pathname = usePathname()
  const isSmartSolutions = pathname?.startsWith('/smart-solutions')

  if (isSmartSolutions) {
    return <CampaignHeader />
  }

  return <MainHeader />
} 