'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Ticket } from 'lucide-react';
import Header from '@/components/Header';

export default function LandingPage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Header */}
      <Header />
      
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/assets/images/suitable-main.jpg"
          alt="Soccer player juggling ball"
          fill
          className="object-cover"
          priority
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Semi-transparent logos overlay */}
      <div className="absolute inset-0 z-10">
        {/* Vodacom logo */}
        <div className="absolute top-20 left-8 opacity-20 text-white text-sm font-bold">vodacom</div>
        {/* SCERE logo */}
        <div className="absolute top-32 right-12 opacity-20 text-white text-sm font-bold">SCERE</div>
        {/* BYLUR logo */}
        <div className="absolute top-48 left-16 opacity-20 text-white text-sm font-bold">BYLUR</div>
        {/* PRIMO logo */}
        <div className="absolute top-64 right-20 opacity-20 text-white text-sm font-bold">PRIMO</div>
        {/* PC24 logo */}
        <div className="absolute top-80 left-24 opacity-20 text-white text-sm font-bold">PC24</div>
        {/* KIT logo */}
        <div className="absolute top-96 right-16 opacity-20 text-white text-sm font-bold">KIT</div>
        {/* BP24 logo */}
        <div className="absolute top-64 left-32 opacity-20 text-white text-sm font-bold">BP24</div>
      </div>

      {/* Main Content */}
      <div className="relative z-20 flex flex-col justify-center min-h-screen px-4 pt-20">
        {/* Center Content */}
        <div className="flex flex-col justify-center items-center text-center">
          {/* Title with yellow border */}
          <div className="border border-yellow-500 rounded-lg px-6 py-3 mb-6">
            <h1 className="text-4xl md:text-6xl font-bold text-white">Suitable Focus</h1>
          </div>
          
          {/* Tagline */}
          <p className="text-lg md:text-xl text-white mb-8 opacity-90 max-w-2xl">
            Helping you grow, build and elevate your empire
          </p>
          
          {/* Yellow underline */}
          <div className="w-12 h-0.5 bg-yellow-500 mb-12"></div>
          
          {/* Action Buttons */}
          <div className="flex gap-4 w-full max-w-md">
            <Link
              href="/services"
              className="flex-1 flex items-center justify-center gap-3 py-4 px-6 rounded-lg font-semibold bg-gray-800 text-white hover:bg-gray-700 transition-colors"
            >
              <Calendar size={20} />
              Services
            </Link>
            <Link
              href="/events"
              className="flex-1 flex items-center justify-center gap-3 py-4 px-6 rounded-lg font-semibold bg-gray-800 text-white hover:bg-gray-700 transition-colors"
            >
              <Ticket size={20} />
              Buy Ticket
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
