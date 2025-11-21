'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useCart } from '@/contexts/CartContext'
import { useAuth } from '@/contexts/EnhancedAuthContext'
import { useSearch } from '@/contexts/SearchContext'
import CartScreen from '@/components/CartScreen'
import { Search } from 'lucide-react'
import { servicesData } from '@/data/services'
import { allEvents } from '@/data/events'
import { useMemo } from 'react'

export default function Header() {
  const { getItemCount } = useCart()
  const { user } = useAuth()
  const { searchTerm, setSearchTerm } = useSearch()
  const pathname = usePathname()
  const [showCartModal, setShowCartModal] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [userData, setUserData] = useState({
    name: 'Loading...',
    email: '',
    avatar: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik01MCAzMEM1OC4yODQzIDMwIDY1IDIzLjI4NDMgNjUgMTVDNjUgNi43MTU3MyA1OC4yODQzIDAgNTAgMEM0MS43MTU3IDAgMzUgNi43MTU3MyAzNSAxNUMzNSAyMy4yODQzIDQxLjcxNTcgMzAgNTAgMzBaIiBmaWxsPSIjOUNBM0FGIi8+CjxwYXRoIGQ9Ik01MCA0MEMzNi4xOTI5IDQwIDI1IDUxLjE5MjkgMjUgNjVWMTAwSDc1VjY1Qzc1IDUxLjE5MjkgNjMuODA3MSA0MCA1MCA0MFoiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+'
  })

  useEffect(() => {
    // Get user data from localStorage or auth context
    const storedUserData = localStorage.getItem('userData')
    if (storedUserData) {
      const parsedUser = JSON.parse(storedUserData)
      setUserData(parsedUser)
    } else if (user) {
      setUserData({
        name: user.user_metadata?.name || 'User',
        email: user.email || '',
        avatar: user.user_metadata?.avatar_url || userData.avatar
      })
    }
  }, [user])

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (isDropdownOpen && !target.closest('.dropdown-container')) {
        setIsDropdownOpen(false)
      }
      if (isSearchOpen && !target.closest('.search-dropdown')) {
        setIsSearchOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isDropdownOpen, isSearchOpen])

  const handleCartClick = () => {
    setShowCartModal(true)
  }

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen)
  }

  const handleSignOut = () => {
    // Clear user data and redirect to home
    localStorage.removeItem('userData')
    window.location.href = '/'
  }

  // Get page title based on current path
  const getPageTitle = () => {
    const pathSegments = pathname.split('/').filter(Boolean)
    
    if (pathname === '/home' || pathname === '/') {
      return null // No title for home page
    }
    
    switch (pathname) {
      case '/services':
        return 'Services'
      case '/events':
        return 'Events'
      case '/profile':
        return 'Profile'
      case '/loyalty':
        return 'Loyalty'
      case '/dashboard':
        return 'Dashboard'
      case '/explore':
        return 'Explore'
      case '/auth/sign-in':
        return 'Sign In'
      case '/auth/sign-up':
        return 'Sign Up'
      case '/auth/forgot-password':
        return 'Forgot Password'
      case '/auth/reset-password':
        return 'Reset Password'
      default:
        // Handle dynamic routes like /services/[id]
        if (pathSegments[0] === 'services' && pathSegments[1]) {
          return 'Service Details'
        }
        if (pathSegments[0] === 'events' && pathSegments[1]) {
          return 'Event Details'
        }
        return 'Page'
    }
  }

  const isHomePage = pathname === '/home' || pathname === '/'
  const isServicesOrEventsPage = pathname === '/services' || pathname === '/events' || pathname.startsWith('/services/') || pathname.startsWith('/events/')
  const pageTitle = getPageTitle()

  // Filter suggestions based on search term
  const suggestions = useMemo(() => {
    if (!searchTerm.trim() || !isServicesOrEventsPage) return []
    
    const term = searchTerm.toLowerCase().trim()
    
    if (pathname.includes('/services')) {
      return servicesData
        .filter(service => 
          service.name.toLowerCase().includes(term) ||
          service.description.toLowerCase().includes(term) ||
          service.tags.some(tag => tag.toLowerCase().includes(term))
        )
        .slice(0, 5) // Limit to 5 suggestions
    } else {
      return allEvents
        .filter(event => 
          event.title.toLowerCase().includes(term) ||
          event.location.toLowerCase().includes(term) ||
          (event.description && event.description.toLowerCase().includes(term))
        )
        .slice(0, 5) // Limit to 5 suggestions
    }
  }, [searchTerm, pathname, isServicesOrEventsPage])

  return (
    <>
      {/* Header */}
      <header className="bg-gray-700 shadow-sm border-b border-gray-600 fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {isHomePage ? (
              // Home page layout with greeting, navigation, and SF logo
              <>
                {/* Left side - Greeting and Navigation */}
                <div className="flex items-center space-x-8">
                  {/* Welcome message and avatar */}
                  <div className="flex items-center space-x-3">
                    <img
                      src={userData.avatar}
                      alt={userData.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="text-gray-200 text-base font-medium">Hi, {userData.name}</span>
                  </div>
                  
                </div>

                {/* Centered SF Logo in protruding circle */}
                <div className="absolute left-1/2 transform -translate-x-1/2">
                  <Link href="/home" className="flex items-center justify-center">
                    <div className="bg-gray-700 rounded-full p-3 shadow-xl border-2 border-gray-600 hover:shadow-2xl transition-all duration-200 hover:scale-105">
                      <Image
                        src="/assets/images/SF-logo.png"
                        alt="Suitable Focus Logo"
                        width={48}
                        height={48}
                        className="drop-shadow-sm"
                      />
                    </div>
                  </Link>
                </div>

                {/* Right side with cart and dropdown or search */}
                <div className="flex items-center space-x-4">
                  {isServicesOrEventsPage ? (
                    /* Search icon for services/events pages */
                    <button 
                      className="text-gray-300 hover:text-white transition-colors"
                      onClick={toggleSearch}
                    >
                      <Search className="w-5 h-5" />
                    </button>
                  ) : (
                    <>
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
                        <Link href="/contact">
                          <button className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                            <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            Contact Us
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
                    </>
                  )}
                </div>
              </>
            ) : (
              // Other pages layout - just page title in center
              <>
                {/* Left side - empty for spacing */}
                <div className="flex-1"></div>
                
                {/* Centered page title */}
                <div className="flex-1 flex justify-center">
                  <h1 className="text-white text-xl font-semibold">
                    {pageTitle}
                  </h1>
                </div>
                
                {/* Right side - cart and dropdown or search */}
                <div className="flex items-center space-x-4 flex-1 justify-end">
                  {isServicesOrEventsPage ? (
                    /* Search icon for services/events pages */
                    <button 
                      className="text-gray-300 hover:text-white transition-colors"
                      onClick={toggleSearch}
                    >
                      <Search className="w-5 h-5" />
                    </button>
                  ) : (
                    <>
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
                        <Link href="/contact">
                          <button className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                            <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            Contact Us
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
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Search Dropdown */}
      {isSearchOpen && isServicesOrEventsPage && (
        <div className="fixed top-16 right-4 w-80 bg-white rounded-lg shadow-lg z-50 search-dropdown">
          <div className="px-4 py-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              {pathname.includes('/services') ? 'Search Services' : 'Search Events'}
            </h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={`Search ${pathname.includes('/services') ? 'services' : 'events'}...`}
                className="w-full pl-10 pr-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:border-yellow-500 focus:outline-none focus:bg-white"
                autoFocus
              />
            </div>
          </div>
          
          {/* Suggestions List */}
          {searchTerm.trim() && suggestions.length > 0 && (
            <div className="border-t border-gray-200 max-h-64 overflow-y-auto">
              {pathname.includes('/services') ? (
                suggestions.map((item) => {
                  const service = item as typeof servicesData[0]
                  return (
                    <Link
                      key={service.id}
                      href={`/services/${service.id}`}
                      onClick={() => setIsSearchOpen(false)}
                      className="block px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <div className="flex items-start space-x-3">
                        <img
                          src={service.image}
                          alt={service.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {service.name}
                          </p>
                          <p className="text-xs text-gray-500 truncate mt-1">
                            {service.description}
                          </p>
                          <p className="text-xs text-yellow-600 font-semibold mt-1">
                            R {service.price}
                          </p>
                        </div>
                      </div>
                    </Link>
                  )
                })
              ) : (
                suggestions.map((item) => {
                  const event = item as typeof allEvents[0]
                  return (
                    <Link
                      key={event.id}
                      href={`/events/${event.id}/ticket`}
                      onClick={() => setIsSearchOpen(false)}
                      className="block px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <div className="flex items-start space-x-3">
                        {event.image && (
                          <img
                            src={event.image}
                            alt={event.title}
                            className="w-12 h-12 object-cover rounded"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {event.title}
                          </p>
                          {event.location && (
                            <p className="text-xs text-gray-500 truncate mt-1">
                              {event.location}
                            </p>
                          )}
                          <p className="text-xs text-yellow-600 font-semibold mt-1">
                            R {event.price}
                          </p>
                        </div>
                      </div>
                    </Link>
                  )
                })
              )}
            </div>
          )}
          
          {/* No results message */}
          {searchTerm.trim() && suggestions.length === 0 && (
            <div className="border-t border-gray-200 px-4 py-6 text-center">
              <p className="text-sm text-gray-500">
                No {pathname.includes('/services') ? 'services' : 'events'} found matching "{searchTerm}"
              </p>
            </div>
          )}
        </div>
      )}

      {/* Cart Screen Modal */}
      <CartScreen visible={showCartModal} onClose={() => setShowCartModal(false)} />
    </>
  )
}
