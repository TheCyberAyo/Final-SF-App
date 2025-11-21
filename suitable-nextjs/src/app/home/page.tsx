'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/contexts/EnhancedAuthContext';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/contexts/ToastContext';
import { ShoppingCart, Menu, Calendar, Ticket, MapPin, Clock } from 'lucide-react';
import Header from '@/components/Header';
import { allEvents } from '@/data/events';

export default function HomePage() {
  const { user } = useAuth();
  const { getItemCount, addToCart } = useCart();
  const { showToast } = useToast();
  const [activeSection, setActiveSection] = useState('main');
  const [menuDropdownVisible, setMenuDropdownVisible] = useState(false);
  const [cartVisible, setCartVisible] = useState(false);

  const handleServiceBooking = (serviceName: string, servicePrice: number) => {
    addToCart({
      id: `service-${serviceName.toLowerCase().replace(/\s+/g, '-')}`,
      name: serviceName,
      price: servicePrice,
      type: 'service',
    });

    showToast('Added to cart!', serviceName);
  };

  const handleBuyTicketPress = (eventName: string, eventPrice: number, eventId?: string) => {
    // Find event in allEvents or use provided data
    let eventToAdd;
    if (eventId) {
      eventToAdd = allEvents.find(e => e.id === eventId);
    } else {
      // Try to find by name
      eventToAdd = allEvents.find(e => e.title === eventName);
    }
    
    if (eventToAdd) {
      addToCart({
        id: eventToAdd.id,
        name: eventToAdd.title,
        price: eventToAdd.price,
        type: 'event',
        image: eventToAdd.image
      });
      showToast('Added to cart!', eventToAdd.title);
    } else {
      // Fallback: create cart item from provided data
      addToCart({
        id: `event-${Date.now()}`,
        name: eventName,
        price: eventPrice,
        type: 'event',
        image: '/assets/images/BayHillExample.jpeg'
      });
      showToast('Added to cart!', eventName);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="container mx-auto px-4">
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col justify-center items-center text-center py-20">
          <div className="border-2 border-yellow-500 rounded-lg px-6 py-3 mb-6">
            <h1 className="text-4xl md:text-6xl font-bold">Suitable Focus</h1>
          </div>
          <p className="text-lg md:text-xl mb-8 opacity-90 max-w-2xl">
            Helping you grow, build and elevate your empire
          </p>
          <div className="w-12 h-0.5 bg-yellow-500 mb-12"></div>
          
          {/* Action Buttons */}
          <div className="bg-gray-800 rounded-xl p-5 flex gap-4 w-full max-w-md">
            <Link
              href="/services"
              className="flex-1 flex items-center justify-center gap-3 py-4 px-6 rounded-lg font-semibold bg-yellow-500 text-black hover:bg-yellow-400 transition-colors"
            >
              <Calendar size={20} />
              Services
            </Link>
            <button
              className={`flex-1 flex items-center justify-center gap-3 py-4 px-6 rounded-lg font-semibold ${
                activeSection === 'tickets' 
                  ? 'bg-yellow-500 text-black' 
                  : 'bg-gray-600 text-white hover:bg-gray-500'
              }`}
              onClick={() => setActiveSection('tickets')}
            >
              <Ticket size={20} />
              Buy Ticket
            </button>
          </div>

          {/* Quick Access Section */}
          <div className="mt-12 max-w-4xl mx-auto">
            <div className="bg-gray-800 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-white text-center mb-6">Quick Access</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {/* Services Preview */}
                <div className="bg-gray-700 rounded-lg p-4">
                  <h3 className="text-yellow-500 font-bold text-lg mb-3 flex items-center gap-2">
                    <Calendar size={20} />
                    Featured Services
                  </h3>
                  <p className="text-gray-300 text-sm mb-4">
                    Discover our most popular services to help grow your business
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white">Entrepreneurs & SMEs Consultations</span>
                      <span className="text-yellow-500 font-semibold">R 350</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white">Individual Brands Consultation</span>
                      <span className="text-yellow-500 font-semibold">R 350</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white">Social Media & Marketing</span>
                      <span className="text-yellow-500 font-semibold">R 750</span>
                    </div>
                  </div>
                  <Link 
                    href="/services"
                    className="block w-full mt-4 bg-yellow-500 hover:bg-yellow-400 text-black text-center py-2 rounded-lg font-semibold transition-colors"
                  >
                    View All Services
                  </Link>
                </div>

                {/* Events Preview */}
                <div className="bg-gray-700 rounded-lg p-4">
                  <h3 className="text-yellow-500 font-bold text-lg mb-3 flex items-center gap-2">
                    <Ticket size={20} />
                    Upcoming Events
                  </h3>
                  <p className="text-gray-300 text-sm mb-4">
                    Join our exciting events and workshops
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white">Bayhill Premier Cup</span>
                      <span className="text-yellow-500 font-semibold">R 450</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white">Let's Elevate, Cape Town</span>
                      <span className="text-yellow-500 font-semibold">R 150</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white">Let's Elevate, Johannesburg</span>
                      <span className="text-yellow-500 font-semibold">R 150</span>
                    </div>
                  </div>
                  <Link 
                    href="/events"
                    className="block w-full mt-4 bg-yellow-500 hover:bg-yellow-400 text-black text-center py-2 rounded-lg font-semibold transition-colors"
                  >
                    View All Events
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* Events Section */}
        {activeSection === 'tickets' && (
          <section className="py-20">
            <h2 className="text-4xl font-bold text-center mb-12 tracking-wide">EVENTS</h2>
            
            {/* Featured Event */}
            <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg mb-12">
              <Image
                src="/assets/images/BayHillExample.jpeg"
                alt="Bayhill Premier Cup"
                width={800}
                height={300}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-yellow-500 text-2xl font-bold">Bayhill Premier Cup</h3>
                  <span className="bg-yellow-600 text-white px-3 py-1 rounded-full text-sm">Featured</span>
                </div>
                <p className="text-white mb-4">Biggest Youth Soccer Tournament in South Africa Held Annually</p>
                <div className="flex gap-6 mb-6">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span>2025/12/15</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} />
                    <span>09:00 AM</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-yellow-500 text-xl font-bold">R 450.00</span>
                  <button 
                    className="bg-yellow-500 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400"
                    onClick={() => handleBuyTicketPress('Bayhill Premier Cup', 450, '1')}
                  >
                    Buy Ticket
                  </button>
                </div>
              </div>
            </div>

            {/* Other Events */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { id: '3', name: "Let's Elevate, Cape Town", price: 150, date: '2025/11/06', time: '10:00 AM', location: 'Workshop 17 Kloof Street', image: '/assets/images/Cape-Town.png' },
                { id: '4', name: "Let's Elevate, Johannesburg", price: 150, date: '2025/11/13', time: '10:00 AM', location: 'Workshop 17, Hyde Park', image: '/assets/images/Johannesburg.png' },
                { id: '5', name: "Let's Elevate, Durban", price: 150, date: '2025/11/19', time: '10:00 AM', location: 'Workshop 17, Ballito', image: '/assets/images/Durban.png' },
                { id: '6', name: "Let's Elevate, Gqeberha", price: 150, date: '2025/11/26', time: '10:00 AM', location: 'TBC', image: '/assets/images/Gqebhera.png' },
              ].map((event, index) => (
                <div key={index} className="bg-gray-800 rounded-xl overflow-hidden shadow-lg">
                  <Image
                    src={event.image}
                    alt={event.name}
                    width={400}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h4 className="text-yellow-500 font-bold text-lg mb-3">{event.name}</h4>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar size={14} />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock size={14} />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin size={14} />
                        <span>{event.location}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-yellow-500 font-bold">R {event.price.toFixed(2)}</span>
                      <button 
                        className="bg-yellow-500 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-400"
                        onClick={() => handleBuyTicketPress(event.name, event.price, event.id)}
                      >
                        Buy Ticket
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className="py-16 text-center mb-20">
          <div className="bg-black rounded-xl p-8">
            <h2 className="text-yellow-500 text-3xl font-bold mb-4">Suitable Focus</h2>
            <p className="text-white opacity-80">© Copyright 2025</p>
          </div>
        </footer>
      </main>
    </div>
  );
}
