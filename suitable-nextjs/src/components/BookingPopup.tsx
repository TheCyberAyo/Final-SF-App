import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

interface BuyTicketPopupProps {
  visible: boolean;
  onClose: () => void;
  eventTitle: string;
  eventPrice: string;
  eventDate?: string;
  eventTime?: string;
}

export default function BuyTicketPopup({
  visible,
  onClose,
  eventTitle,
  eventPrice,
  eventDate,
  eventTime,
}: BuyTicketPopupProps) {
  const { addToCart } = useCart();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    if (!formData.fullName || !formData.email || !formData.phone) {
      alert('Please fill in all fields');
      return;
    }

    // Add ticket to cart
    addToCart({
      id: `ticket-${eventTitle.toLowerCase().replace(/\s+/g, '-')}`,
      name: `${eventTitle} Ticket`,
      price: parseFloat(eventPrice.replace('R ', '')),
      type: 'event',
    });

    alert('Ticket added to cart successfully!');
    onClose();
    
    // Reset form
    setFormData({
      fullName: '',
      email: '',
      phone: '',
    });
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">Buy Ticket</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-1"
          >
            <X size={24} />
          </button>
        </div>

        {/* Event Details */}
        <div className="mb-6 p-4 bg-gray-700 rounded-lg">
          <h3 className="text-lg font-semibold text-yellow-500 mb-2">{eventTitle}</h3>
          {eventDate && (
            <p className="text-white text-sm mb-1">Date: {eventDate}</p>
          )}
          {eventTime && (
            <p className="text-white text-sm mb-1">Time: {eventTime}</p>
          )}
          <p className="text-yellow-500 font-bold text-lg">{eventPrice}</p>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-yellow-500 focus:outline-none"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-yellow-500 focus:outline-none"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-yellow-500 focus:outline-none"
              placeholder="Enter your phone number"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 px-4 py-2 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-400 transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}