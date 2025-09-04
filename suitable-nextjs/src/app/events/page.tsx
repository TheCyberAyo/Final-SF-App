'use client'

import { useState } from 'react'

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
    price: 90,
    image: '/assets/images/Cape-Town.png',
  },
  {
    id: '4',
    title: 'Let\'s Elevate, Johannesburg',
    date: '2025-11-13',
    time: '10:00 AM',
    location: 'Workshop 17, Hyde Park',
    price: 90,
    image: '/assets/images/Johannesburg.png',
  },
  {
    id: '5',
    title: 'Let\'s Elevate, Durban',
    date: '2025-11-19',
    time: '10:00 AM',
    location: 'Workshop 17, Ballito',
    price: 90,
    image: '/assets/images/Durban.png',
  },
  {
    id: '6',
    title: 'Let\'s Elevate, Gqeberha',
    date: '2025-11-26',
    time: '10:00 AM',
    location: 'TBC',
    price: 90,
    image: '/assets/images/Gqebhera.png',
  },
]

const categories = ['All', 'Technology', 'Music', 'Business', 'Art', 'Sports', 'Food']

export default function EventsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredEvents = mockEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-white text-center w-full">EVENTS</h1>
            <a href="/" className="text-gray-400 hover:text-white absolute left-4">← Back to Home</a>
          </div>
        </div>
      </header>

             {/* Events Grid */}
       <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
         {filteredEvents.length === 0 ? (
           <div className="text-center py-12">
             <h3 className="text-lg font-medium text-white mb-2">No events found</h3>
             <p className="text-gray-400">Try adjusting your search or filters</p>
           </div>
         ) : (
           <div className="space-y-6">
             {filteredEvents.map((event) => (
               <div key={event.id} className="bg-gray-800 rounded-lg overflow-hidden">
                 <div className="relative">
                   <img
                     src={event.image}
                     alt={event.title}
                     className="w-full h-64 object-cover"
                   />
                 </div>
                 
                 <div className="p-6">
                   <div className="flex items-center justify-between mb-2">
                     <h3 className="text-2xl font-semibold text-yellow-400">{event.title}</h3>
                     {event.featured && (
                       <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-semibold">
                         Featured
                       </span>
                     )}
                   </div>
                   
                   {event.description && (
                     <p className="text-white mb-4">{event.description}</p>
                   )}
                   
                   <div className="flex items-center justify-between mb-4">
                     <div className="flex items-center text-white">
                       <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                       </svg>
                       <span>{event.date}</span>
                     </div>
                     
                     <div className="flex items-center text-white">
                       <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                       </svg>
                       <span>{event.time}</span>
                     </div>
                   </div>
                   
                   <div className="flex items-center justify-between">
                     <div className="text-yellow-400 font-semibold text-lg">
                       R {event.price}.00
                     </div>
                     <button 
                       onClick={() => window.location.href = `/events/${event.id}/ticket`}
                       className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 px-6 rounded-lg transition-colors"
                     >
                       Buy Ticket
                     </button>
                   </div>
                 </div>
               </div>
             ))}
           </div>
         )}

                   {/* Upcoming Events Section */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-white text-center mb-8">Upcoming Events</h2>
            <div className="space-y-6">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="bg-gray-800 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-yellow-400 mb-4">{event.title}</h3>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-white">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>{event.date}</span>
                    </div>
                    
                    <div className="flex items-center text-white">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{event.type}</span>
                    </div>
                    
                    <div className="flex items-center text-white">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{event.platform}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-yellow-400 font-semibold text-lg">
                      R {event.price}.00
                    </div>
                    <button 
                      onClick={() => window.location.href = `/events/${event.id}/ticket`}
                      className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 px-6 rounded-lg transition-colors"
                    >
                      Buy Ticket
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Let's Elevate Events Section */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-white text-center mb-8">Let's Elevate Events</h2>
            <div className="space-y-6">
              {letsElevateEvents.map((event) => (
                <div key={event.id} className="bg-gray-800 rounded-lg overflow-hidden">
                  <div className="relative">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-64 object-cover"
                    />
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-yellow-400 mb-4">{event.title}</h3>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center text-white">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>{event.date}</span>
                      </div>
                      
                      <div className="flex items-center text-white">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{event.time}</span>
                      </div>
                      
                      <div className="flex items-center text-white">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>{event.location}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-yellow-400 font-semibold text-lg">
                        R {event.price}.00
                      </div>
                      <button 
                        onClick={() => window.location.href = `/events/${event.id}/ticket`}
                        className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 px-6 rounded-lg transition-colors"
                      >
                        Buy Ticket
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
       </main>
    </div>
  )
}
