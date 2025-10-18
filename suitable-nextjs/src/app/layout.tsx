import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { CartProvider } from '@/contexts/CartContext'
import { AuthProvider } from '@/contexts/EnhancedAuthContext'
import { LoyaltyProvider } from '@/contexts/LoyaltyContext'
import BottomNavigation from '@/components/BottomNavigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Suitable Focus - Event Booking & Ticket Management',
  description: 'A modern event booking and ticket management application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <LoyaltyProvider>
            <CartProvider>
              <div className="pb-16">
                {children}
              </div>
              <BottomNavigation />
            </CartProvider>
          </LoyaltyProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
