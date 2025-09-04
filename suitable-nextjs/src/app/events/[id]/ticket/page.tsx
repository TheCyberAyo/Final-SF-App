'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'

// Mock events data - in a real app this would come from an API
const mockEvents = {
  '1': {
    id: '1',
    title: 'Bayhill Premier Cup',
    date: '2025-12-15',
    time: '09:00 AM',
    location: 'South Africa',
    price: 450,
    category: 'Sports',
    image: '/assets/images/BayHillExample.jpeg',
    description: 'Biggest Youth Soccer Tournament in South Africa Held Annually',
    featured: true,
  },
  '2': {
    id: '2',
    title: 'CUSTOMER RELATIONSHIPS, MARKETING & PROJECT WORKFLOWS',
    date: '2025-09-17',
    time: 'Online Event',
    location: 'Virtual Platform',
    price: 300,
    category: 'Business',
    image: '/assets/images/BayHillExample.jpeg', // Using same image for now
    description: 'Learn about customer relationships, marketing strategies and project workflows',
    featured: false,
  },
  '3': {
    id: '3',
    title: 'Let\'s Elevate, Cape Town',
    date: '2025-11-06',
    time: '10:00 AM',
    location: 'Workshop 17 Kloof Street',
    price: 90,
    category: 'Workshop',
    image: '/assets/images/Cape-Town.png',
    description: 'Join us for an inspiring workshop in Cape Town',
    featured: false,
  },
  '4': {
    id: '4',
    title: 'Let\'s Elevate, Johannesburg',
    date: '2025-11-13',
    time: '10:00 AM',
    location: 'Workshop 17, Hyde Park',
    price: 90,
    category: 'Workshop',
    image: '/assets/images/Johannesburg.png',
    description: 'Join us for an inspiring workshop in Johannesburg',
    featured: false,
  },
  '5': {
    id: '5',
    title: 'Let\'s Elevate, Durban',
    date: '2025-11-19',
    time: '10:00 AM',
    location: 'Workshop 17, Ballito',
    price: 90,
    category: 'Workshop',
    image: '/assets/images/Durban.png',
    description: 'Join us for an inspiring workshop in Durban',
    featured: false,
  },
  '6': {
    id: '6',
    title: 'Let\'s Elevate, Gqeberha',
    date: '2025-11-26',
    time: '10:00 AM',
    location: 'TBC',
    price: 90,
    category: 'Workshop',
    image: '/assets/images/Gqebhera.png',
    description: 'Join us for an inspiring workshop in Gqeberha',
    featured: false,
  },
}

export default function TicketPage() {
  const params = useParams()
  const [quantity, setQuantity] = useState(1)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  })

  // Get the event based on the ID from the URL
  const eventId = params.id as string
  const mockEvent = mockEvents[eventId] || mockEvents['1'] // Default to first event if not found

  const totalPrice = mockEvent.price * quantity

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handlePurchase = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle ticket purchase logic here
    alert('Ticket purchase successful! You will receive a confirmation email shortly.')
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="bg-black border-b border-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <a href="/events" className="text-gray-400 hover:text-white">← Back to Events</a>
            <h1 className="text-2xl font-bold text-white">Purchase Ticket</h1>
            <div></div> {/* Spacer for centering */}
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Event Details */}
          <div className="bg-gray-800 rounded-lg overflow-hidden">
            <div className="relative">
              <img
                src={mockEvent.image}
                alt={mockEvent.title}
                className="w-full h-64 object-cover"
              />
            </div>
            
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-semibold text-yellow-400">{mockEvent.title}</h2>
                {mockEvent.featured && (
                  <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-semibold">
                    Featured
                  </span>
                )}
              </div>
              
              <p className="text-white mb-4">{mockEvent.description}</p>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center text-white">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{mockEvent.date}</span>
                </div>
                
                <div className="flex items-center text-white">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{mockEvent.time}</span>
                </div>
              </div>
              
              <div className="text-yellow-400 font-semibold text-lg">
                R {mockEvent.price}.00 per ticket
              </div>
            </div>
          </div>

          {/* Purchase Form */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-6">Ticket Information</h3>
            
            <form onSubmit={handlePurchase} className="space-y-6">
              {/* Quantity */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Number of Tickets
                </label>
                <div className="flex items-center space-x-4">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="bg-gray-700 hover:bg-gray-600 text-white w-10 h-10 rounded-lg flex items-center justify-center"
                  >
                    -
                  </button>
                  <span className="text-white text-lg font-semibold min-w-[3rem] text-center">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="bg-gray-700 hover:bg-gray-600 text-white w-10 h-10 rounded-lg flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                />
              </div>

              {/* Total */}
              <div className="border-t border-gray-700 pt-4">
                <div className="flex justify-between items-center text-white">
                  <span className="text-lg">Total Amount:</span>
                  <span className="text-2xl font-bold text-yellow-400">
                    R {totalPrice}.00
                  </span>
                </div>
              </div>

              {/* Purchase Button */}
              <button
                type="submit"
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-4 px-6 rounded-lg transition-colors text-lg"
              >
                Complete Purchase
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}
