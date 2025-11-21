'use client'

import React, { useEffect } from 'react'
import { CheckCircle, X, ShoppingCart } from 'lucide-react'
import { useToast } from '@/contexts/ToastContext'

export default function Toast() {
  const { currentToast, hideToast } = useToast()
  const duration = 3000

  useEffect(() => {
    if (currentToast) {
      const timer = setTimeout(() => {
        hideToast()
      }, duration)

      return () => clearTimeout(timer)
    }
  }, [currentToast, duration, hideToast])

  if (!currentToast) return null

  return (
    <div className="fixed top-20 right-4 z-50 animate-slide-in">
      <div className="bg-green-500 text-white rounded-lg shadow-lg p-4 min-w-[300px] max-w-md flex items-center space-x-3 border-l-4 border-green-600">
        <div className="flex-shrink-0">
          <ShoppingCart className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <p className="font-semibold">{currentToast.message}</p>
          {currentToast.itemName && (
            <p className="text-sm text-green-100 mt-1">{currentToast.itemName}</p>
          )}
        </div>
        <button
          onClick={hideToast}
          className="text-white hover:text-green-100 transition-colors flex-shrink-0"
          aria-label="Close notification"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}

