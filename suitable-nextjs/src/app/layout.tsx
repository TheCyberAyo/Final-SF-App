import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { CartProvider } from '@/contexts/CartContext'
import { AuthProvider } from '@/contexts/EnhancedAuthContext'
import { LoyaltyProvider } from '@/contexts/LoyaltyContext'
import { SearchProvider } from '@/contexts/SearchContext'
import { ToastProvider } from '@/contexts/ToastContext'
import BottomNavigation from '@/components/BottomNavigation'
import Toast from '@/components/Toast'

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
              <SearchProvider>
                <ToastProvider>
                  <div className="pb-16">
                    {children}
                  </div>
                  <BottomNavigation />
                  <Toast />
                </ToastProvider>
              </SearchProvider>
            </CartProvider>
          </LoyaltyProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
