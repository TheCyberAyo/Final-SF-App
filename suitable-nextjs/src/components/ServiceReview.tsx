'use client'

import React, { useState } from 'react'
import { Star, ThumbsUp, Calendar } from 'lucide-react'

interface ServiceReviewProps {
  review: {
    id: string
    userName: string
    userAvatar: string
    rating: number
    comment: string
    date: string
    helpful: number
  }
}

export default function ServiceReview({ review }: ServiceReviewProps) {
  const [isHelpful, setIsHelpful] = useState(false)
  const [helpfulCount, setHelpfulCount] = useState(review.helpful)

  const handleHelpful = () => {
    if (!isHelpful) {
      setHelpfulCount(prev => prev + 1)
      setIsHelpful(true)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-400'
        }`}
      />
    ))
  }

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <div className="flex items-start space-x-4">
        <img
          src={review.userAvatar}
          alt={review.userName}
          className="w-12 h-12 rounded-full"
        />
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h4 className="text-white font-semibold">{review.userName}</h4>
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  {renderStars(review.rating)}
                </div>
                <span className="text-gray-400 text-sm">
                  {formatDate(review.date)}
                </span>
              </div>
            </div>
          </div>
          
          <p className="text-gray-300 text-sm leading-relaxed mb-4">
            {review.comment}
          </p>
          
          <div className="flex items-center justify-between">
            <button
              onClick={handleHelpful}
              disabled={isHelpful}
              className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm transition-colors ${
                isHelpful
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <ThumbsUp className="w-4 h-4" />
              <span>
                {isHelpful ? 'Helpful' : 'Helpful'} ({helpfulCount})
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

interface ServiceRatingProps {
  averageRating: number
  totalReviews: number
  onWriteReview?: () => void
}

export function ServiceRating({ averageRating, totalReviews, onWriteReview }: ServiceRatingProps) {
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

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1">
            {renderStars(averageRating)}
          </div>
          <div>
            <span className="text-white text-2xl font-bold">
              {averageRating.toFixed(1)}
            </span>
            <span className="text-gray-400 text-sm ml-2">
              ({totalReviews} reviews)
            </span>
          </div>
        </div>
        
        {onWriteReview && (
          <button
            onClick={onWriteReview}
            className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-lg font-semibold transition-colors"
          >
            Write Review
          </button>
        )}
      </div>
      
      <div className="space-y-2">
        {[5, 4, 3, 2, 1].map((star) => {
          const count = Math.floor(Math.random() * totalReviews) // Mock data
          const percentage = (count / totalReviews) * 100
          
          return (
            <div key={star} className="flex items-center space-x-3">
              <span className="text-gray-400 text-sm w-8">{star}</span>
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <div className="flex-1 bg-gray-700 rounded-full h-2">
                <div
                  className="bg-yellow-400 h-2 rounded-full"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="text-gray-400 text-sm w-8">{count}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

