'use client'

import { CampaignHeader } from '@/components/smart-solutions/campaign-header'

export default function SmartSolutionsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <style jsx global>{`
        header#main-header {
          display: none !important;
        }
        
        /* Reset margin that accounts for main header */
        section:first-child {
          margin-top: 0 !important;
        }
      `}</style>
      
      <CampaignHeader />
      <main>{children}</main>
    </div>
  )
} 