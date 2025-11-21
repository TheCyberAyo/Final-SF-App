'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Star, Clock, Users, Award, ArrowLeft, Calendar } from 'lucide-react'
import { useCart } from '@/contexts/CartContext'
import { useLoyalty } from '@/contexts/LoyaltyContext'
import Header from '@/components/Header'
import ServiceBookingModal from '@/components/ServiceBookingModal'
import ServiceReview, { ServiceRating } from '@/components/ServiceReview'
import { getServiceById, Service } from '@/data/services'
import Link from 'next/link'

interface ServiceDetailPageProps {
  params: Promise<{
    id: string
  }>
}

export default function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const { getItemCount } = useCart()
  const { totalPoints } = useLoyalty()
  const [service, setService] = useState<Service | null>(null)
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [showAllReviews, setShowAllReviews] = useState(false)
  const [serviceId, setServiceId] = useState<string>('')

  useEffect(() => {
    const getParams = async () => {
      const resolvedParams = await params
      setServiceId(resolvedParams.id)
    }
    getParams()
  }, [params])

  useEffect(() => {
    if (serviceId) {
      const foundService = getServiceById(serviceId)
      setService(foundService || null)
    }
  }, [serviceId])

  if (!service) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Service Not Found</h1>
          <Link href="/services" className="text-yellow-500 hover:text-yellow-400">
            ← Back to Services
          </Link>
        </div>
      </div>
    )
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${
          index < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-400'
        }`}
      />
    ))
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'consultation':
        return <Users className="w-6 h-6" />
      case 'design':
        return <Award className="w-6 h-6" />
      case 'marketing':
        return <Star className="w-6 h-6" />
      case 'development':
        return <Clock className="w-6 h-6" />
      case 'media':
        return <Star className="w-6 h-6" />
      default:
        return <Star className="w-6 h-6" />
    }
  }

  const displayedReviews = showAllReviews ? service.reviews : service.reviews.slice(0, 3)

  return (
    <div className="min-h-screen bg-black relative">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-5"
        style={{
          backgroundImage: "url('/assets/images/suitable-main.jpg')"
        }}
      />

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="pt-20 pb-24 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <Link 
            href="/services"
            className="inline-flex items-center space-x-2 text-gray-400 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Services</span>
          </Link>

          {/* Service Hero Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Service Image */}
            <div className="relative">
              <Image
                src={service.image}
                alt={service.name}
                width={600}
                height={400}
                className="w-full h-96 object-cover rounded-lg"
              />
              
              {/* Badges */}
              <div className="absolute top-4 left-4 flex space-x-2">
                {service.isPopular && (
                  <span className="bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-semibold">
                    Popular
                  </span>
                )}
                {service.isNew && (
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    New
                  </span>
                )}
              </div>

              {/* Category Icon */}
              <div className="absolute top-4 right-4 bg-gray-800 bg-opacity-80 rounded-full p-3">
                {getCategoryIcon(service.category)}
              </div>
            </div>

            {/* Service Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-white mb-4">{service.name}</h1>
                <p className="text-gray-300 text-lg leading-relaxed">{service.longDescription}</p>
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-1">
                  {renderStars(service.averageRating)}
                </div>
                <span className="text-white text-xl font-bold">
                  {service.averageRating.toFixed(1)}
                </span>
                <span className="text-gray-400">
                  ({service.totalReviews} reviews)
                </span>
              </div>

              {/* Price and Loyalty Points */}
              <div className="bg-gray-800 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-yellow-400 font-bold text-3xl">
                      R {service.price}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-yellow-500 text-lg font-semibold">
                      +{service.loyaltyPoints} loyalty points
                    </div>
                    <div className="text-gray-400 text-sm">
                      You have {totalPoints} points
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setShowBookingModal(true)}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-4 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
                >
                  <Calendar className="w-5 h-5" />
                  <span>Book Now</span>
                </button>
              </div>

              {/* Service Details */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Clock className="w-5 h-5 text-yellow-500" />
                    <span className="text-white font-semibold">Duration</span>
                  </div>
                  <span className="text-gray-300">{service.duration}</span>
                </div>
                <div className="bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Users className="w-5 h-5 text-yellow-500" />
                    <span className="text-white font-semibold">Type</span>
                  </div>
                  <span className="text-gray-300 capitalize">{service.type}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">What's Included</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {service.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3 bg-gray-800 rounded-lg p-4">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-gray-300">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews Section */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Customer Reviews</h2>
              <ServiceRating 
                averageRating={service.averageRating} 
                totalReviews={service.totalReviews}
              />
            </div>

            <div className="space-y-6">
              {displayedReviews.map((review) => (
                <ServiceReview key={review.id} review={review} />
              ))}
            </div>

            {service.reviews.length > 3 && (
              <div className="text-center mt-8">
                <button
                  onClick={() => setShowAllReviews(!showAllReviews)}
                  className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors"
                >
                  {showAllReviews ? 'Show Less Reviews' : `Show All ${service.reviews.length} Reviews`}
                </button>
              </div>
            )}
          </div>

          {/* Tags */}
          <div className="mb-12">
            <h3 className="text-xl font-bold text-white mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {service.tags.map((tag, index) => (
                <span key={index} className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Service Booking Modal */}
      <ServiceBookingModal
        service={service}
        visible={showBookingModal}
        onClose={() => setShowBookingModal(false)}
      />
    </div>
  )
}
