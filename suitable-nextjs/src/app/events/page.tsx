'use client'
import { Calendar, MapPin, Clock, Users } from 'lucide-react'
import { useSearch } from '@/contexts/SearchContext'
import { useCart } from '@/contexts/CartContext'
import { useToast } from '@/contexts/ToastContext'
import Header from '@/components/Header'

// Mock events data
const mockEvents = [
  {
    id: '1',
    title: 'Bayhill Premier Cup',
    date: '2025-12-15',
    time: '09:00',
    location: 'South Africa',
    price: 450,
    category: 'Sports',
    image: '/assets/images/BayHillExample.jpeg',
    attendees: 1200,
    maxAttendees: 1500,
    description: 'Biggest Youth Soccer Tournament in South Africa Held Annually',
    featured: true,
  },
]

// Upcoming events data
const upcomingEvents = [
  {
    id: '2',
    title: 'CUSTOMER RELATIONSHIPS, MARKETING & PROJECT WORKFLOWS',
    date: '2025-09-17',
    type: 'Online Event',
    platform: 'Virtual Platform',
    price: 300,
  },
]

// Let's Elevate events data
const letsElevateEvents = [
  {
    id: '3',
    title: 'Let\'s Elevate, Cape Town',
    date: '2025-11-06',
    time: '10:00 AM',
    location: 'Workshop 17 Kloof Street',
    price: 150,
    image: '/assets/images/Cape-Town.png',
  },
  {
    id: '4',
    title: 'Let\'s Elevate, Johannesburg',
    date: '2025-11-13',
    time: '10:00 AM',
    location: 'Workshop 17, Hyde Park',
    price: 150,
    image: '/assets/images/Johannesburg.png',
  },
  {
    id: '5',
    title: 'Let\'s Elevate, Durban',
    date: '2025-11-19',
    time: '10:00 AM',
    location: 'Workshop 17, Ballito',
    price: 150,
    image: '/assets/images/Durban.png',
  },
  {
    id: '6',
    title: 'Let\'s Elevate, Gqeberha',
    date: '2025-11-26',
    time: '10:00 AM',
    location: 'TBC',
    price: 150,
    image: '/assets/images/Gqebhera.png',
  },
]

type EventType = typeof mockEvents[0] | typeof letsElevateEvents[0] | typeof upcomingEvents[0]

export default function EventsPage() {
  const { searchTerm } = useSearch()
  const { addToCart } = useCart()
  const { showToast } = useToast()
  const selectedCategory = 'All'

  const handleAddTicketToCart = (event: EventType) => {
    const eventTitle = 'title' in event ? event.title : 'Event'
    const eventId = event.id || `event-${Date.now()}`
    const eventPrice = event.price || 0
    const eventImage = 'image' in event && event.image ? event.image : '/assets/images/BayHillExample.jpeg'
    
    addToCart({
      id: eventId,
      name: eventTitle,
      price: eventPrice,
      type: 'event',
      image: eventImage
    })
    showToast('Added to cart!', eventTitle)
  }

  const filteredEvents = mockEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory
    return matchesSearch && matchesCategory
  })

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

      {/* Main Content */}
      <main className="pt-20 pb-24 px-4 relative z-10">
        {/* Hero Section */}
        <div 
          className="text-center mb-12 relative py-16 px-8 rounded-lg overflow-hidden min-h-[400px]"
          style={{
            backgroundImage: "url('/assets/images/gold1.jpeg')",
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
              OUR EVENTS
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover exciting events, tournaments, and experiences designed to bring communities together and create unforgettable memories.
            </p>
          </div>
        </div>


        {/* Events Grid */}
        <div className="max-w-6xl mx-auto">
          {filteredEvents.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-white mb-2">No events found</h3>
              <p className="text-gray-400">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event) => (
                <div key={event.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                  <div className="relative">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-48 object-cover"
                    />
                    
                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex space-x-2">
                      {event.featured && (
                        <span className="bg-yellow-500 text-black px-3 py-1 rounded-full text-xs font-semibold">
                          Featured
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">
                      {event.title}
                    </h3>
                    
                    {event.description && (
                      <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                        {event.description}
                      </p>
                    )}
                    
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center text-white">
                        <Calendar className="w-5 h-5 mr-2" />
                        <span>{event.date}</span>
                      </div>
                      
                      <div className="flex items-center text-white">
                        <Clock className="w-5 h-5 mr-2" />
                        <span>{event.time}</span>
                      </div>
                      
                      <div className="flex items-center text-white">
                        <MapPin className="w-5 h-5 mr-2" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-yellow-400 font-bold text-lg">
                        R {event.price}.00
                      </div>
                      <div className="flex items-center text-gray-400 text-sm">
                        <Users className="w-4 h-4 mr-1" />
                        <span>{event.attendees}/{event.maxAttendees}</span>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => handleAddTicketToCart(event)}
                      className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-4 rounded-lg transition-colors"
                    >
                      Buy Ticket
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Upcoming Events Section */}
        <div className="max-w-6xl mx-auto mt-16">
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Upcoming Events
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">
                    {event.title}
                  </h3>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center text-white">
                      <Calendar className="w-5 h-5 mr-2" />
                      <span>{event.date}</span>
                    </div>
                    
                    <div className="flex items-center text-white">
                      <Clock className="w-5 h-5 mr-2" />
                      <span>{event.type}</span>
                    </div>
                    
                    <div className="flex items-center text-white">
                      <MapPin className="w-5 h-5 mr-2" />
                      <span>{event.platform}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-yellow-400 font-bold text-lg">
                      R {event.price}.00
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => handleAddTicketToCart(event)}
                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-4 rounded-lg transition-colors"
                  >
                    Buy Ticket
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Let's Elevate Events Section */}
        <div className="max-w-6xl mx-auto mt-16">
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Let's Elevate Events
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {letsElevateEvents.map((event) => (
              <div key={event.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <div className="relative">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-48 object-cover"
                  />
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">
                    {event.title}
                  </h3>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center text-white">
                      <Calendar className="w-5 h-5 mr-2" />
                      <span>{event.date}</span>
                    </div>
                    
                    <div className="flex items-center text-white">
                      <Clock className="w-5 h-5 mr-2" />
                      <span>{event.time}</span>
                    </div>
                    
                    <div className="flex items-center text-white">
                      <MapPin className="w-5 h-5 mr-2" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-yellow-400 font-bold text-lg">
                      R {event.price}.00
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => handleAddTicketToCart(event)}
                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-4 rounded-lg transition-colors"
                  >
                    Buy Ticket
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  )
}