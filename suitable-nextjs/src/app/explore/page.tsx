'use client';

import React from 'react';

export default function ExplorePage() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold mb-6">Explore</h1>
        <p className="text-xl text-gray-300 mb-12">
          Discover new possibilities and find what suits you best
        </p>
        
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { emoji: '🎨', title: 'Art & Design' },
              { emoji: '💻', title: 'Technology' },
              { emoji: '🍳', title: 'Food & Cooking' },
              { emoji: '🏃‍♂️', title: 'Fitness' },
            ].map((category, index) => (
              <div key={index} className="bg-gray-800 rounded-lg p-6 text-center hover:bg-gray-700 transition-colors">
                <div className="text-4xl mb-3">{category.emoji}</div>
                <h3 className="font-medium">{category.title}</h3>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold mb-6">Trending</h2>
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-3">Popular This Week</h3>
            <p className="text-gray-300">
              See what others are discovering and loving right now.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

