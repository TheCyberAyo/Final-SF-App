'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Star, TrendingUp, Clock, Users, Award } from 'lucide-react'
import { useCart } from '@/contexts/CartContext'
import { useLoyalty } from '@/contexts/LoyaltyContext'
import { useSearch } from '@/contexts/SearchContext'
import Header from '@/components/Header'
import ServiceBookingModal from '@/components/ServiceBookingModal'
// Removed unused ServiceReview imports
import CartScreen from '@/components/CartScreen'
import { servicesData, Service } from '@/data/services'

export default function ServicesPage() {
  const { getItemCount } = useCart()
  const { totalPoints } = useLoyalty()
  const { searchTerm, clearSearch } = useSearch()
  const [showCartModal, setShowCartModal] = useState(false)
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('popular')
  const [showAddedFeedback] = useState(false)
  const [addedItemName] = useState('')

  const categories = [
    { id: 'all', name: 'All Services' },
    { id: 'consultation', name: 'Consultations' },
    { id: 'design', name: 'Design' },
    { id: 'marketing', name: 'Marketing' },
    { id: 'development', name: 'Development' },
    { id: 'media', name: 'Media' }
  ]

  const sortOptions = [
    { id: 'popular', name: 'Most Popular' },
    { id: 'rating', name: 'Highest Rated' },
    { id: 'price-low', name: 'Price: Low to High' },
    { id: 'price-high', name: 'Price: High to Low' },
    { id: 'newest', name: 'Newest First' }
  ]

  const filteredServices = servicesData.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory
    
    return matchesSearch && matchesCategory
  }).sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.averageRating - a.averageRating
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'newest':
        return b.isNew ? 1 : -1
      case 'popular':
      default:
        return b.isPopular ? 1 : -1
    }
  })

  const handleBookService = (service: Service) => {
    setSelectedService(service)
    setShowBookingModal(true)
  }

  const handleCloseBookingModal = () => {
    setShowBookingModal(false)
    setSelectedService(null)
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-400'
        }`}
      />
    ))
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'consultation':
        return <Users className="w-5 h-5" />
      case 'design':
        return <Award className="w-5 h-5" />
      case 'marketing':
        return <TrendingUp className="w-5 h-5" />
      case 'development':
        return <Clock className="w-5 h-5" />
      case 'media':
        return <Star className="w-5 h-5" />
      default:
        return <Star className="w-5 h-5" />
    }
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
      <Header />

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
        {/* Hero Section */}
        <div 
          className="text-center mb-12 relative py-16 px-8 rounded-lg overflow-hidden min-h-[400px]"
          style={{
            backgroundImage: "url('/assets/images/gold2.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'scroll'
          }}
        >
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg"></div>
          
          {/* Content */}
          <div className="relative z-10">
            <h1 className="text-4xl md:text-6xl font-bold text-white uppercase tracking-wide mb-4">
              OUR SERVICES
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover our comprehensive range of professional services designed to help you grow, build, and elevate your business empire.
            </p>
          </div>
        </div>


        {/* Services Grid */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <div key={service.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                {/* Service Image */}
                <div className="relative">
                  <Image
                    src={service.image}
                    alt={service.name}
                    width={400}
                    height={250}
                    className="w-full h-48 object-cover"
                  />
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex space-x-2">
                    {service.isPopular && (
                      <span className="bg-yellow-500 text-black px-3 py-1 rounded-full text-xs font-semibold">
                        Popular
                      </span>
                    )}
                    {service.isNew && (
                      <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        New
                      </span>
                    )}
                  </div>

                  {/* Category Icon */}
                  <div className="absolute top-4 right-4 bg-gray-800 bg-opacity-80 rounded-full p-2">
                    {getCategoryIcon(service.category)}
                  </div>
                </div>

                {/* Service Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">
                    {service.name}
                  </h3>
                  
                  <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                    {service.description}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="flex items-center space-x-1">
                      {renderStars(service.averageRating)}
                    </div>
                    <span className="text-gray-400 text-sm">
                      {service.averageRating.toFixed(1)} ({service.totalReviews} reviews)
                    </span>
                  </div>

                  {/* Features */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {service.features.slice(0, 2).map((feature, index) => (
                        <span key={index} className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded">
                          {feature}
                        </span>
                      ))}
                      {service.features.length > 2 && (
                        <span className="text-gray-400 text-xs">
                          +{service.features.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Price and Loyalty Points */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-yellow-400 font-bold text-lg">
                        R {service.price}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-yellow-500 text-sm font-semibold">
                        +{service.loyaltyPoints} pts
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2">
                    <Link
                      href={`/services/${service.id}`}
                      className="w-full bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-center block"
                    >
                      View Details
                    </Link>
                    <button
                      onClick={() => handleBookService(service)}
                      className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-4 rounded-lg transition-colors"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredServices.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-lg mb-4">No services found matching your criteria</div>
              <button
                onClick={() => {
                  clearSearch()
                  setSelectedCategory('all')
                  setSortBy('popular')
                }}
                className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-2 rounded-lg font-semibold transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* Featured Services Section */}
        <div className="max-w-6xl mx-auto mt-16">
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Featured Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {servicesData.filter(service => service.isPopular).slice(0, 2).map((service) => (
              <div key={service.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                <div className="relative">
                  <Image
                    src={service.image}
                    alt={service.name}
                    width={600}
                    height={300}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-2xl font-bold mb-2">{service.name}</h3>
                    <p className="text-gray-300 mb-4">{service.description}</p>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        {renderStars(service.averageRating)}
                      </div>
                      <span className="text-yellow-400 font-bold text-xl">
                        R {service.price}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>

      {/* Service Booking Modal */}
      {selectedService && (
        <ServiceBookingModal
          service={selectedService}
          visible={showBookingModal}
          onClose={handleCloseBookingModal}
        />
      )}

      {/* Cart Screen Modal */}
      <CartScreen visible={showCartModal} onClose={() => setShowCartModal(false)} />
    </div>
  )
}