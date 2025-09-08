'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '@/contexts/CartContext'
import CartScreen from '@/components/CartScreen'

export default function ServicesPage() {
  const [user, setUser] = useState({
    name: 'Loading...',
    email: '',
    avatar: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik01MCAzMEM1OC4yODQzIDMwIDY1IDIzLjI4NDMgNjUgMTVDNjUgNi43MTU3MyA1OC4yODQzIDAgNTAgMEM0MS43MTU3IDAgMzUgNi43MTU3MyAzNSAxNUMzNSAyMy4yODQzIDQxLjcxNTcgMzAgNTAgMzBaIiBmaWxsPSIjOUNBM0FGIi8+CjxwYXRoIGQ9Ik01MCA0MEMzNi4xOTI5IDQwIDI1IDUxLjE5MjkgMjUgNjVWMTAwSDc1VjY1Qzc1IDUxLjE5MjkgNjMuODA3MSA0MCA1MCA0MFoiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+'
  })
  
  const [showModal, setShowModal] = useState(false)
  const [showModal2, setShowModal2] = useState(false)
  const [showAdditionalModal, setShowAdditionalModal] = useState(false)
  const [showCartModal, setShowCartModal] = useState(false)
  const [selectedConsultationType, setSelectedConsultationType] = useState('')
  const [selectedConsultationType2, setSelectedConsultationType2] = useState('')
  const [selectedAdditionalService, setSelectedAdditionalService] = useState('')
  const [showAddedFeedback, setShowAddedFeedback] = useState(false)
  const [addedItemName, setAddedItemName] = useState('')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const { addToCart, getItemCount } = useCart()

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem('userData')
    if (userData) {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)
    }
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (isDropdownOpen && !target.closest('.dropdown-container')) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isDropdownOpen])

  const handleBookNow = () => {
    setShowModal(true)
  }

  const handleBookNow2 = () => {
    setShowModal2(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setSelectedConsultationType('')
  }

  const handleCloseModal2 = () => {
    setShowModal2(false)
    setSelectedConsultationType2('')
  }

  const handleConsultationSelect = (type: string) => {
    setSelectedConsultationType(type)
  }

  const handleConsultationSelect2 = (type: string) => {
    setSelectedConsultationType2(type)
  }

  const handleAddToCart = () => {
    if (selectedConsultationType) {
      const price = selectedConsultationType === 'online' ? 350 : 600
      const name = `Entrepreneurs and SMEs Consultation (${selectedConsultationType})`
      
      addToCart({
        id: `entrepreneur-${selectedConsultationType}`,
        name,
        price,
        type: 'service',
        image: '/assets/images/EntrepreneurConsultation.jpg'
      })
      
      setAddedItemName(name)
      setShowAddedFeedback(true)
      setTimeout(() => setShowAddedFeedback(false), 2000)
      handleCloseModal()
    }
  }

  const handleAddToCart2 = () => {
    if (selectedConsultationType2) {
      const price = selectedConsultationType2 === 'online' ? 350 : 600
      const name = `Individual Brands Consultation (${selectedConsultationType2})`
      
      addToCart({
        id: `individual-${selectedConsultationType2}`,
        name,
        price,
        type: 'service',
        image: '/assets/images/IndividualConsultation.jpg'
      })
      
      setAddedItemName(name)
      setShowAddedFeedback(true)
      setTimeout(() => setShowAddedFeedback(false), 2000)
      handleCloseModal2()
    }
  }

  const handleAdditionalServiceBook = (serviceName: string) => {
    setSelectedAdditionalService(serviceName)
    setShowAdditionalModal(true)
  }

  const handleCloseAdditionalModal = () => {
    setShowAdditionalModal(false)
    setSelectedAdditionalService('')
  }

  const handleAddAdditionalToCart = () => {
    if (selectedAdditionalService) {
      const prices = {
        'Media': 850,
        'Graphic Design': 650,
        'Social Media & Marketing': 750,
        'Email Marketing': 550,
        'Website Development': 1200
      }
      
      const price = prices[selectedAdditionalService as keyof typeof prices]
      
      addToCart({
        id: `additional-${selectedAdditionalService.toLowerCase().replace(/\s+/g, '-')}`,
        name: selectedAdditionalService,
        price,
        type: 'service'
      })
      
      setAddedItemName(selectedAdditionalService)
      setShowAddedFeedback(true)
      setTimeout(() => setShowAddedFeedback(false), 2000)
      handleCloseAdditionalModal()
    }
  }

  const handleCartClick = () => {
    setShowCartModal(true)
  }

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const handleSignOut = () => {
    // Clear user data and redirect to home
    localStorage.removeItem('userData')
    window.location.href = '/'
  }

  return (
    <div className="min-h-screen bg-black relative">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
        style={{
          backgroundImage: "url('/assets/images/suitable-main.jpg')"
        }}
      />

      {/* Header */}
      <header className="bg-gray-700 shadow-sm border-b border-gray-600 fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo on the left */}
            <div className="flex items-center">
              <Image
                src="/assets/images/SF-logo.png"
                alt="Suitable Focus Logo"
                width={40}
                height={40}
              />
            </div>

            {/* Centered welcome message and avatar */}
            <div className="flex items-center space-x-3">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-8 h-8 rounded-full"
              />
              <span className="text-gray-200 text-base font-medium">Hi, {user.name}</span>
            </div>

            {/* Fixed right side with cart and dropdown */}
            <div className="flex items-center space-x-4">
              {/* Shopping cart */}
              <button 
                className="text-gray-300 hover:text-white transition-colors relative"
                onClick={handleCartClick}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                </svg>
                {getItemCount() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {getItemCount()}
                  </span>
                )}
              </button>

              {/* Dropdown menu */}
              <div className="relative dropdown-container">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center space-x-2 text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </button>

                {/* Dropdown menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <Link href="/profile">
                      <button className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                        <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Profile
                      </button>
                    </Link>
                    <Link href="/settings">
                      <button className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                        <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Settings
                      </button>
                    </Link>
                    <Link href="/dashboard">
                      <button className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                        <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        Dashboard
                      </button>
                    </Link>
                    <hr className="my-1" />
                    <button
                      onClick={handleSignOut}
                      className="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition-colors"
                    >
                      <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Added to Cart Feedback */}
      {showAddedFeedback && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-bounce">
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>{addedItemName} added to cart!</span>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="pt-20 pb-24 px-4 relative z-10">
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white uppercase tracking-wide">
            OUR SERVICES
          </h1>
        </div>

        {/* Service Cards */}
        <div className="max-w-4xl mx-auto space-y-6">
          {/* First Service Card - Entrepreneurs and SMEs Consultations */}
          <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
            <div className="relative">
              <Image
                src="/assets/images/EntrepreneurConsultation.jpg"
                alt="Entrepreneurs and SMEs Consultations"
                width={800}
                height={400}
                className="w-full h-64 object-cover"
              />
            </div>
            <div className="p-6">
              <h2 className="text-xl font-bold text-white mb-3">
                Entrepreneurs and SMEs Consultations
              </h2>
              <p className="text-gray-300 text-sm mb-4">
                Get expert guidance from experienced entrepreneurs. Choose between in-person (R600) or online (R350) consultation.
              </p>
              <div className="flex justify-between items-center">
                <span className="text-yellow-400 font-bold text-lg">
                  From R 350.00
                </span>
                <button 
                  className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-6 rounded-lg transition-colors"
                  onClick={handleBookNow}
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>

          {/* Second Service Card - Individual Brands Consultation */}
          <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
            <div className="relative">
              <Image
                src="/assets/images/IndividualConsultation.jpg"
                alt="Individual Brands Consultation"
                width={800}
                height={400}
                className="w-full h-64 object-cover"
              />
            </div>
            <div className="p-6">
              <h2 className="text-xl font-bold text-white mb-3">
                Individual Brands Consultation
              </h2>
              <p className="text-gray-300 text-sm mb-4">
                Get expert guidance from experienced entrepreneurs. Choose between in-person (R600) or online (R350) consultation.
              </p>
              <div className="flex justify-between items-center">
                <span className="text-yellow-400 font-bold text-lg">
                  From R 350.00
                </span>
                <button 
                  className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-6 rounded-lg transition-colors"
                  onClick={handleBookNow2}
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Services Section */}
        <div className="max-w-6xl mx-auto mt-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white uppercase tracking-wide">
              Additional Services
            </h2>
          </div>

          {/* Additional Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Media */}
            <div className="bg-gray-800 rounded-lg p-6 text-center shadow-lg">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center">
                  <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                </div>
              </div>
              <h3 className="text-yellow-400 font-bold text-lg mb-2">Media</h3>
              <p className="text-white text-sm mb-2">Photography and videography services</p>
              <p className="text-yellow-400 font-bold text-lg mb-4">R 850.00</p>
              <button 
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-6 rounded-lg transition-colors"
                onClick={() => handleAdditionalServiceBook('Media')}
              >
                Book Now
              </button>
            </div>

            {/* Graphic Design */}
            <div className="bg-gray-800 rounded-lg p-6 text-center shadow-lg">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center">
                  <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                </div>
              </div>
              <h3 className="text-yellow-400 font-bold text-lg mb-2">Graphic Design</h3>
              <p className="text-white text-sm mb-2">Professional graphic design services</p>
              <p className="text-yellow-400 font-bold text-lg mb-4">R 650.00</p>
              <button 
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-6 rounded-lg transition-colors"
                onClick={() => handleAdditionalServiceBook('Graphic Design')}
              >
                Book Now
              </button>
            </div>

            {/* Social Media & Marketing */}
            <div className="bg-gray-800 rounded-lg p-6 text-center shadow-lg">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center">
                  <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                </div>
              </div>
              <h3 className="text-yellow-400 font-bold text-lg mb-2">Social Media & Marketing</h3>
              <p className="text-white text-sm mb-2">Social media and marketing services</p>
              <p className="text-yellow-400 font-bold text-lg mb-4">R 750.00</p>
              <button 
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-6 rounded-lg transition-colors"
                onClick={() => handleAdditionalServiceBook('Social Media & Marketing')}
              >
                Book Now
              </button>
            </div>

            {/* Email Marketing */}
            <div className="bg-gray-800 rounded-lg p-6 text-center shadow-lg">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center">
                  <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                </div>
              </div>
              <h3 className="text-yellow-400 font-bold text-lg mb-2">Email Marketing</h3>
              <p className="text-white text-sm mb-2">Professional email marketing campaigns</p>
              <p className="text-yellow-400 font-bold text-lg mb-4">R 550.00</p>
              <button 
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-6 rounded-lg transition-colors"
                onClick={() => handleAdditionalServiceBook('Email Marketing')}
              >
                Book Now
              </button>
            </div>

            {/* Website Development */}
            <div className="bg-gray-800 rounded-lg p-6 text-center shadow-lg md:col-start-2">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center">
                  <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                </div>
              </div>
              <h3 className="text-yellow-400 font-bold text-lg mb-2">Website Development</h3>
              <p className="text-white text-sm mb-2">Custom website development solutions</p>
              <p className="text-yellow-400 font-bold text-lg mb-4">R 1200.00</p>
              <button 
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-6 rounded-lg transition-colors"
                onClick={() => handleAdditionalServiceBook('Website Development')}
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Consultation Booking Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg max-w-md w-full shadow-xl">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-700">
              <h3 className="text-xl font-bold text-white">
                Entrepreneurs and SMEs Consultations
              </h3>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Image */}
            <div className="relative">
              <Image
                src="/assets/images/EntrepreneurConsultation.jpg"
                alt="Entrepreneurs and SMEs Consultations"
                width={400}
                height={200}
                className="w-full h-48 object-cover"
              />
            </div>

            {/* Modal Description */}
            <div className="p-6">
              <p className="text-white text-sm mb-6">
                Get expert guidance from our experienced entrepreneurs to help grow your business and overcome challenges.
              </p>

              <h4 className="text-white font-semibold mb-4">Choose Consultation Type:</h4>

              {/* Consultation Options */}
              <div className="space-y-3 mb-6">
                <button
                  onClick={() => handleConsultationSelect('online')}
                  className={`w-full p-4 rounded-lg border-2 transition-colors ${
                    selectedConsultationType === 'online'
                      ? 'border-yellow-500 bg-yellow-500 bg-opacity-10'
                      : 'border-gray-600 bg-gray-700 hover:border-gray-500'
                  }`}
                >
                  <div className="text-left">
                    <div className="text-white font-semibold">Online: R350</div>
                  </div>
                </button>

                <button
                  onClick={() => handleConsultationSelect('in-person')}
                  className={`w-full p-4 rounded-lg border-2 transition-colors ${
                    selectedConsultationType === 'in-person'
                      ? 'border-yellow-500 bg-yellow-500 bg-opacity-10'
                      : 'border-gray-600 bg-gray-700 hover:border-gray-500'
                  }`}
                >
                  <div className="text-left">
                    <div className="text-white font-semibold">In-person: R600</div>
                  </div>
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                disabled={!selectedConsultationType}
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                  selectedConsultationType
                    ? 'bg-gray-600 hover:bg-gray-500 text-white'
                    : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                }`}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Individual Brands Consultation Booking Modal */}
      {showModal2 && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg max-w-md w-full shadow-xl">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-700">
              <h3 className="text-xl font-bold text-white">
                Individual Brands Consultation
              </h3>
              <button
                onClick={handleCloseModal2}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Image */}
            <div className="relative">
              <Image
                src="/assets/images/IndividualConsultation.jpg"
                alt="Individual Brands Consultation"
                width={400}
                height={200}
                className="w-full h-48 object-cover"
              />
            </div>

            {/* Modal Description */}
            <div className="p-6">
              <p className="text-white text-sm mb-6">
                Get expert guidance from our experienced entrepreneurs to help grow your business and overcome challenges.
              </p>

              <h4 className="text-white font-semibold mb-4">Choose Consultation Type:</h4>

              {/* Consultation Options */}
              <div className="space-y-3 mb-6">
                <button
                  onClick={() => handleConsultationSelect2('online')}
                  className={`w-full p-4 rounded-lg border-2 transition-colors ${
                    selectedConsultationType2 === 'online'
                      ? 'border-yellow-500 bg-yellow-500 bg-opacity-10'
                      : 'border-gray-600 bg-gray-700 hover:border-gray-500'
                  }`}
                >
                  <div className="text-left">
                    <div className="text-white font-semibold">Online: R350</div>
                  </div>
                </button>

                <button
                  onClick={() => handleConsultationSelect2('in-person')}
                  className={`w-full p-4 rounded-lg border-2 transition-colors ${
                    selectedConsultationType2 === 'in-person'
                      ? 'border-yellow-500 bg-yellow-500 bg-opacity-10'
                      : 'border-gray-600 bg-gray-700 hover:border-gray-500'
                  }`}
                >
                  <div className="text-left">
                    <div className="text-white font-semibold">In-person: R600</div>
                  </div>
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart2}
                disabled={!selectedConsultationType2}
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                  selectedConsultationType2
                    ? 'bg-gray-600 hover:bg-gray-500 text-white'
                    : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                }`}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
             )}

       {/* Additional Services Booking Modal */}
       {showAdditionalModal && (
         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
           <div className="bg-gray-800 rounded-lg max-w-md w-full shadow-xl">
             {/* Modal Header */}
             <div className="flex justify-between items-center p-6 border-b border-gray-700">
               <h3 className="text-xl font-bold text-white">
                 {selectedAdditionalService}
               </h3>
               <button
                 onClick={handleCloseAdditionalModal}
                 className="text-gray-400 hover:text-white transition-colors"
               >
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                 </svg>
               </button>
             </div>

             {/* Modal Content */}
             <div className="p-6">
               <div className="text-center mb-6">
                 <div className="w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                   <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center">
                     <svg className="w-8 h-8 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                       <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                     </svg>
                   </div>
                 </div>
                 <h4 className="text-white font-semibold text-lg mb-2">{selectedAdditionalService}</h4>
                 <p className="text-gray-300 text-sm mb-4">
                   {selectedAdditionalService === 'Media' && 'Photography and videography services'}
                   {selectedAdditionalService === 'Graphic Design' && 'Professional graphic design services'}
                   {selectedAdditionalService === 'Social Media & Marketing' && 'Social media and marketing services'}
                   {selectedAdditionalService === 'Email Marketing' && 'Professional email marketing campaigns'}
                   {selectedAdditionalService === 'Website Development' && 'Custom website development solutions'}
                 </p>
                 <div className="text-yellow-400 font-bold text-2xl">
                   {selectedAdditionalService === 'Media' && 'R 850.00'}
                   {selectedAdditionalService === 'Graphic Design' && 'R 650.00'}
                   {selectedAdditionalService === 'Social Media & Marketing' && 'R 750.00'}
                   {selectedAdditionalService === 'Email Marketing' && 'R 550.00'}
                   {selectedAdditionalService === 'Website Development' && 'R 1200.00'}
                 </div>
               </div>

               {/* Add to Cart Button */}
               <button
                 onClick={handleAddAdditionalToCart}
                 className="w-full py-3 px-6 rounded-lg font-semibold transition-colors bg-gray-600 hover:bg-gray-500 text-white"
               >
                 Add to Cart
               </button>
             </div>
           </div>
         </div>
       )}

               {/* Cart Screen Modal */}
        <CartScreen visible={showCartModal} onClose={() => setShowCartModal(false)} />

    </div>
  )
}
