'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/contexts/EnhancedAuthContext';
import { useCart } from '@/contexts/CartContext';
import { ShoppingCart, Menu, Calendar, Ticket, MapPin, Clock } from 'lucide-react';

export default function HomePage() {
  const { user } = useAuth();
  const { getItemCount, addToCart } = useCart();
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

    alert(`${serviceName} has been added to your cart for R ${servicePrice.toFixed(2)}.`);
  };

  const handleBuyTicketPress = (eventTitle: string, eventPrice: string, eventDate?: string, eventTime?: string) => {
    // Handle ticket purchase logic here
    console.log('Buy ticket:', { eventTitle, eventPrice, eventDate, eventTime });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-gray-800 px-5 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Image
            src="/assets/images/SF-logo.png"
            alt="Suitable Focus Logo"
            width={32}
            height={32}
            className="rounded"
          />
          {user && (
            <span className="text-white font-semibold opacity-90">
              {user.user_metadata?.name || 'Welcome'}
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <button 
            className="relative p-2 hover:bg-gray-700 rounded"
            onClick={() => setCartVisible(true)}
          >
            <ShoppingCart size={24} color="white" />
            {getItemCount() > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {getItemCount()}
              </span>
            )}
          </button>
          <button 
            className="p-2 hover:bg-gray-700 rounded"
            onClick={() => setMenuDropdownVisible(!menuDropdownVisible)}
          >
            <Menu size={24} color="white" />
          </button>
        </div>
      </header>

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
            <button
              className={`flex-1 flex items-center justify-center gap-3 py-4 px-6 rounded-lg font-semibold ${
                activeSection === 'services' 
                  ? 'bg-yellow-500 text-black' 
                  : 'bg-gray-600 text-white hover:bg-gray-500'
              }`}
              onClick={() => setActiveSection('services')}
            >
              <Calendar size={20} />
              Services
            </button>
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
        </section>

        {/* Services Section */}
        {activeSection === 'services' && (
          <section className="py-20">
            <h2 className="text-4xl font-bold text-center mb-12 tracking-wide">OUR SERVICES</h2>
            
            {/* Consultation Services */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg">
                <Image
                  src="/assets/images/EntrepreneurConsultation.jpg"
                  alt="Entrepreneur Consultation"
                  width={400}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3">Entrepreneurs and SMEs Consultations</h3>
                  <p className="text-gray-300 mb-4">
                    Get expert guidance from experienced entrepreneurs. Choose between in-person (R600) or online (R350) consultation.
                  </p>
                  <p className="text-yellow-500 text-xl font-bold mb-4">From R 350.00</p>
                  <button 
                    className="bg-yellow-500 text-black px-6 py-2 rounded-lg font-semibold hover:bg-yellow-400"
                    onClick={() => handleServiceBooking('Entrepreneur Consultation', 350)}
                  >
                    Book Now
                  </button>
                </div>
              </div>

              <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg">
                <Image
                  src="/assets/images/IndividualConsultation.jpg"
                  alt="Individual Consultation"
                  width={400}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3">Individual Brands Consultation</h3>
                  <p className="text-gray-300 mb-4">
                    Get expert guidance from experienced entrepreneurs. Choose between in-person (R600) or online (R350) consultation.
                  </p>
                  <p className="text-yellow-500 text-xl font-bold mb-4">From R 350.00</p>
                  <button 
                    className="bg-yellow-500 text-black px-6 py-2 rounded-lg font-semibold hover:bg-yellow-400"
                    onClick={() => handleServiceBooking('Individual Consultation', 350)}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>

            {/* Additional Services */}
            <h3 className="text-3xl font-bold text-center mb-8">Additional Services</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: 'Media Services', price: 850, icon: '📷', description: 'Photography and videography services' },
                { name: 'Graphic Design', price: 650, icon: '🎨', description: 'Professional graphic design services' },
                { name: 'Social Media & Marketing', price: 750, icon: '📢', description: 'Social media and marketing services' },
                { name: 'Email Marketing', price: 550, icon: '📧', description: 'Professional email marketing campaigns' },
                { name: 'Website Development', price: 1200, icon: '💻', description: 'Custom website development solutions' },
              ].map((service, index) => (
                <div key={index} className="bg-gray-800 rounded-xl p-6 text-center shadow-lg">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h4 className="text-yellow-500 font-bold text-lg mb-2">{service.name}</h4>
                  <p className="text-gray-300 text-sm mb-3">{service.description}</p>
                  <p className="text-yellow-500 font-bold text-lg mb-4">R {service.price.toFixed(2)}</p>
                  <button 
                    className="bg-yellow-500 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-400"
                    onClick={() => handleServiceBooking(service.name, service.price)}
                  >
                    Book Now
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

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
                    onClick={() => handleBuyTicketPress('Bayhill Premier Cup', 'R 450.00', '2025/12/15', '09:00 AM')}
                  >
                    Buy Ticket
                  </button>
                </div>
              </div>
            </div>

            {/* Other Events */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: "Let's Elevate, Cape Town", price: 90, date: '2025/11/06', time: '10:00 AM', location: 'Workshop 17 Kloof Street', image: '/assets/images/Cape-Town.png' },
                { name: "Let's Elevate, Johannesburg", price: 90, date: '2025/11/13', time: '10:00 AM', location: 'Workshop 17, Hyde Park', image: '/assets/images/Johannesburg.png' },
                { name: "Let's Elevate, Durban", price: 90, date: '2025/11/19', time: '10:00 AM', location: 'Workshop 17, Ballito', image: '/assets/images/Durban.png' },
                { name: "Let's Elevate, Gqeberha", price: 90, date: '2025/11/26', time: '10:00 AM', location: 'TBC', image: '/assets/images/Gqebhera.png' },
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
                        onClick={() => handleBuyTicketPress(event.name, `R ${event.price.toFixed(2)}`, event.date, event.time)}
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
        <footer className="py-16 text-center">
          <div className="bg-black rounded-xl p-8">
            <h2 className="text-yellow-500 text-3xl font-bold mb-4">Suitable Focus</h2>
            <p className="text-white opacity-80">© Copyright 2025</p>
          </div>
        </footer>
      </main>
    </div>
  );
}
