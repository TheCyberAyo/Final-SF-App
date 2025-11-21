'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

interface Toast {
  id: string
  message: string
  itemName?: string
}

interface ToastContextType {
  showToast: (message: string, itemName?: string) => void
  currentToast: Toast | null
  hideToast: () => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}

interface ToastProviderProps {
  children: ReactNode
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [currentToast, setCurrentToast] = useState<Toast | null>(null)

  const showToast = (message: string, itemName?: string) => {
    const toast: Toast = {
      id: `toast-${Date.now()}`,
      message,
      itemName
    }
    setCurrentToast(toast)
  }

  const hideToast = () => {
    setCurrentToast(null)
  }

  const value: ToastContextType = {
    showToast,
    currentToast,
    hideToast
  }

  return (
    <ToastContext.Provider value={value}>
      {children}
    </ToastContext.Provider>
  )
}

