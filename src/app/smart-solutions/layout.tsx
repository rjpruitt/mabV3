'use client'

import { CampaignHeader } from '@/components/smart-solutions/campaign-header'

export default function SmartSolutionsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div 
      className="smart-solutions-campaign flex min-h-screen flex-col"
      style={{ '--campaign-header-height': '48px' } as React.CSSProperties}
    >
      <CampaignHeader />
      <main>{children}</main>
    </div>
  )
} 