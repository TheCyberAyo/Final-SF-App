'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { X, CreditCard, Shield, Clock, MapPin, Video } from 'lucide-react'
import { useCart } from '@/contexts/CartContext'
import { useLoyalty } from '@/contexts/LoyaltyContext'
import { Service } from '@/data/services'

interface ServiceBookingModalProps {
  service: Service
  visible: boolean
  onClose: () => void
}

export default function ServiceBookingModal({ service, visible, onClose }: ServiceBookingModalProps) {
  const { addToCart } = useCart()
  const { earnPoints, getPointsForService } = useLoyalty()
  const [selectedType, setSelectedType] = useState<'online' | 'in-person'>('online')
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'points' | 'both'>('card')
  const [pointsToUse, setPointsToUse] = useState(0)
  const [isProcessing, setIsProcessing] = useState(false)

  if (!visible) return null

  const availableTimes = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
  ]

  const getPrice = () => {
    if (service.type === 'both') {
      return selectedType === 'online' ? service.price : service.price + 250
    }
    return service.price
  }

  const getLoyaltyPoints = () => {
    return getPointsForService(getPrice())
  }

  const handleBooking = async () => {
    setIsProcessing(true)
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Add to cart
      addToCart({
        id: `${service.id}-${selectedType}`,
        name: `${service.name} (${selectedType})`,
        price: getPrice(),
        type: selectedType,
        image: service.image
      })

      // Earn loyalty points
      earnPoints(getLoyaltyPoints(), service.id, service.name)

      alert(`Service booked successfully! You earned ${getLoyaltyPoints()} loyalty points.`)
      onClose()
    } catch (error) {
      alert('Booking failed. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-700">
          <h3 className="text-xl font-bold text-white">{service.name}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {/* Service Image and Info */}
          <div className="flex space-x-6 mb-6">
            <div className="w-48 h-32 relative rounded-lg overflow-hidden">
              <Image
                src={service.image}
                alt={service.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <h4 className="text-white font-semibold text-lg mb-2">{service.name}</h4>
              <p className="text-gray-300 text-sm mb-3">{service.description}</p>
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{service.duration}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Shield className="w-4 h-4" />
                  <span>Secure Payment</span>
                </div>
              </div>
            </div>
          </div>

          {/* Service Type Selection */}
          {service.type === 'both' && (
            <div className="mb-6">
              <h4 className="text-white font-semibold mb-3">Choose Service Type:</h4>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setSelectedType('online')}
                  className={`p-4 rounded-lg border-2 transition-colors ${
                    selectedType === 'online'
                      ? 'border-yellow-500 bg-yellow-500 bg-opacity-10'
                      : 'border-gray-600 bg-gray-700 hover:border-gray-500'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Video className="w-5 h-5 text-yellow-500" />
                    <div className="text-left">
                      <div className="text-white font-semibold">Online</div>
                      <div className="text-gray-400 text-sm">Video call session</div>
                      <div className="text-yellow-500 font-bold">R {service.price}</div>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => setSelectedType('in-person')}
                  className={`p-4 rounded-lg border-2 transition-colors ${
                    selectedType === 'in-person'
                      ? 'border-yellow-500 bg-yellow-500 bg-opacity-10'
                      : 'border-gray-600 bg-gray-700 hover:border-gray-500'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-yellow-500" />
                    <div className="text-left">
                      <div className="text-white font-semibold">In-Person</div>
                      <div className="text-gray-400 text-sm">Face-to-face meeting</div>
                      <div className="text-yellow-500 font-bold">R {service.price + 250}</div>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* Date and Time Selection */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-white font-semibold mb-2">Select Date</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-yellow-500 focus:outline-none"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div>
              <label className="block text-white font-semibold mb-2">Select Time</label>
              <select
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-yellow-500 focus:outline-none"
              >
                <option value="">Choose time</option>
                {availableTimes.map(time => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Payment Method */}
          <div className="mb-6">
            <h4 className="text-white font-semibold mb-3">Payment Method</h4>
            <div className="space-y-3">
              <button
                onClick={() => setPaymentMethod('card')}
                className={`w-full p-4 rounded-lg border-2 transition-colors ${
                  paymentMethod === 'card'
                    ? 'border-yellow-500 bg-yellow-500 bg-opacity-10'
                    : 'border-gray-600 bg-gray-700 hover:border-gray-500'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <CreditCard className="w-5 h-5 text-yellow-500" />
                  <div className="text-left">
                    <div className="text-white font-semibold">Credit/Debit Card</div>
                    <div className="text-gray-400 text-sm">Pay R {getPrice()}</div>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Service Features */}
          <div className="mb-6">
            <h4 className="text-white font-semibold mb-3">What's Included:</h4>
            <ul className="space-y-2">
              {service.features.map((feature, index) => (
                <li key={index} className="flex items-center space-x-2 text-gray-300">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Loyalty Points Info */}
          <div className="bg-yellow-500 bg-opacity-10 border border-yellow-500 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-2 text-yellow-500">
              <Shield className="w-5 h-5" />
              <span className="font-semibold">
                Earn {getLoyaltyPoints()} loyalty points with this purchase!
              </span>
            </div>
          </div>

          {/* Booking Button */}
          <button
            onClick={handleBooking}
            disabled={!selectedDate || !selectedTime || isProcessing}
            className={`w-full py-4 px-6 rounded-lg font-semibold transition-colors ${
              selectedDate && selectedTime && !isProcessing
                ? 'bg-yellow-500 hover:bg-yellow-600 text-black'
                : 'bg-gray-700 text-gray-400 cursor-not-allowed'
            }`}
          >
            {isProcessing ? 'Processing...' : `Book Now - R ${getPrice()}`}
          </button>
        </div>
      </div>
    </div>
  )
}

