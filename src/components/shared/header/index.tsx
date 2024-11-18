'use client'

import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { TopBanner } from './top-banner'
import { MainNav } from './main-nav'

export function Header() {
  const { scrollY } = useScroll()
  const headerHeight = useTransform(
    scrollY,
    [0, 100],
    ['var(--header-height-normal)', 'var(--header-height-condensed)']
  )
  
  const navHeight = useTransform(
    scrollY,
    [0, 100],
    ['var(--nav-height-normal)', 'var(--nav-height-condensed)']
  )

  return (
    <motion.header 
      className="fixed w-full top-0 z-50"
      style={{ height: headerHeight }}
    >
      <TopBanner />
      <motion.nav 
        className="bg-primary text-white"
        style={{ height: navHeight }}
      >
        <MainNav />
      </motion.nav>
    </motion.header>
  )
} 