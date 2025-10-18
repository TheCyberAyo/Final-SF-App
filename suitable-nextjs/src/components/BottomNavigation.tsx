'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Calendar, Ticket, User, Star } from 'lucide-react'
import { useLoyalty } from '@/contexts/LoyaltyContext'

interface NavItem {
  name: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

const navItems: NavItem[] = [
  {
    name: 'Home',
    href: '/',
    icon: Home,
  },
  {
    name: 'Services',
    href: '/services',
    icon: Calendar,
  },
  {
    name: 'Events',
    href: '/events',
    icon: Ticket,
  },
  {
    name: 'Profile',
    href: '/profile',
    icon: User,
  },
  {
    name: 'Loyalty',
    href: '/loyalty',
    icon: Star,
  },
]

export default function BottomNavigation() {
  const pathname = usePathname()
  const { totalPoints } = useLoyalty()

  // Debug logging
  console.log('BottomNavigation - totalPoints:', totalPoints)

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-amber-400 z-50">
      {/* Top border line */}
      <div className="w-full h-px bg-amber-600"></div>
      
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon
          const isLoyaltyItem = item.name === 'Loyalty'
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className="flex flex-col items-center justify-center relative py-2 px-3 transition-colors"
            >
              <div className="relative">
                {isActive ? (
                  // Active state with dark circular background
                  <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                ) : (
                  // Inactive state
                  <Icon className="w-6 h-6 text-black" />
                )}
                
                {/* Loyalty points badge */}
                {isLoyaltyItem && (
                  <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full min-w-[20px] h-5 flex items-center justify-center font-bold px-1">
                    {totalPoints}
                  </div>
                )}
              </div>
              <span 
                className={`text-xs mt-1 font-medium ${
                  isActive ? 'text-black' : 'text-black'
                }`}
              >
                {item.name}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
