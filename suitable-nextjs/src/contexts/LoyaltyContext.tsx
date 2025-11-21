'use client'

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react'

export interface LoyaltyTransaction {
  id: string
  type: 'earned' | 'redeemed'
  amount: number
  description: string
  serviceId?: string
  serviceName?: string
  eventId?: string
  eventName?: string
  date: string
}

interface LoyaltyContextType {
  totalPoints: number
  transactions: LoyaltyTransaction[]
  earnPoints: (amount: number, serviceId: string, serviceName: string) => void
  earnPointsForEvent: (amount: number, eventId: string, eventName: string) => void
  redeemPoints: (amount: number, description: string) => boolean
  getPointsForService: (servicePrice: number) => number
  getPointsForEvent: (eventPrice: number) => number
}

const LoyaltyContext = createContext<LoyaltyContextType | undefined>(undefined)

export const useLoyalty = () => {
  const context = useContext(LoyaltyContext)
  if (!context) {
    throw new Error('useLoyalty must be used within a LoyaltyProvider')
  }
  return context
}

interface LoyaltyProviderProps {
  children: ReactNode
}

export const LoyaltyProvider: React.FC<LoyaltyProviderProps> = ({ children }) => {
  const [totalPoints, setTotalPoints] = useState(0)
  const [transactions, setTransactions] = useState<LoyaltyTransaction[]>([])

  // Load data from localStorage on mount
  useEffect(() => {
    const savedPoints = localStorage.getItem('loyaltyPoints')
    const savedTransactions = localStorage.getItem('loyaltyTransactions')
    
    if (savedPoints) {
      setTotalPoints(parseInt(savedPoints))
    } else {
      // Set some initial points for testing if none exist
      setTotalPoints(0)
    }
    
    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions))
    }
  }, [])

  // Save to localStorage whenever points or transactions change
  useEffect(() => {
    localStorage.setItem('loyaltyPoints', totalPoints.toString())
    localStorage.setItem('loyaltyTransactions', JSON.stringify(transactions))
  }, [totalPoints, transactions])

  const earnPoints = (amount: number, serviceId: string, serviceName: string) => {
    const transaction: LoyaltyTransaction = {
      id: `earn-${Date.now()}`,
      type: 'earned',
      amount,
      description: `Earned ${amount} points for purchasing ${serviceName}`,
      serviceId,
      serviceName,
      date: new Date().toISOString()
    }

    setTotalPoints(prev => prev + amount)
    setTransactions(prev => [transaction, ...prev])
  }

  const earnPointsForEvent = (amount: number, eventId: string, eventName: string) => {
    const transaction: LoyaltyTransaction = {
      id: `earn-event-${Date.now()}`,
      type: 'earned',
      amount,
      description: `Earned ${amount} points for purchasing ticket to ${eventName}`,
      eventId,
      eventName,
      date: new Date().toISOString()
    }

    setTotalPoints(prev => prev + amount)
    setTransactions(prev => [transaction, ...prev])
  }

  const redeemPoints = (amount: number, description: string): boolean => {
    if (totalPoints < amount) {
      return false
    }

    const transaction: LoyaltyTransaction = {
      id: `redeem-${Date.now()}`,
      type: 'redeemed',
      amount,
      description,
      date: new Date().toISOString()
    }

    setTotalPoints(prev => prev - amount)
    setTransactions(prev => [transaction, ...prev])
    return true
  }

  const getPointsForService = (servicePrice: number): number => {
    // Earn 1 point for every R10 spent
    return Math.floor(servicePrice / 10)
  }

  const getPointsForEvent = (eventPrice: number): number => {
    // Earn 1 point for every R10 spent
    return Math.floor(eventPrice / 10)
  }

  const value: LoyaltyContextType = {
    totalPoints,
    transactions,
    earnPoints,
    earnPointsForEvent,
    redeemPoints,
    getPointsForService,
    getPointsForEvent
  }

  return (
    <LoyaltyContext.Provider value={value}>
      {children}
    </LoyaltyContext.Provider>
  )
}

