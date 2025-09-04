import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

interface IndividualConsultationPopupProps {
  visible: boolean;
  onClose: () => void;
  onOpenCart: () => void;
}

export default function IndividualConsultationPopup({
  visible,
  onClose,
  onOpenCart,
}: IndividualConsultationPopupProps) {
  const { addToCart } = useCart();
  const [selectedType, setSelectedType] = useState<'online' | 'in-person'>('online');

  const consultationOptions = {
    online: { price: 350, name: 'Online Individual Consultation' },
    'in-person': { price: 600, name: 'In-Person Individual Consultation' },
  };

  const handleBookConsultation = () => {
    const option = consultationOptions[selectedType];
    
    addToCart({
      id: `individual-consultation-${selectedType}`,
      name: option.name,
      price: option.price,
      type: selectedType,
    });

    alert(`${option.name} has been added to your cart for R ${option.price.toFixed(2)}.`);
    onClose();
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">Book Consultation</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-1"
          >
            <X size={24} />
          </button>
        </div>

        {/* Service Details */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-yellow-500 mb-3">
            Individual Brands Consultation
          </h3>
          <p className="text-gray-300 text-sm mb-4">
            Get personalized guidance for your individual brand. Choose your preferred consultation type:
          </p>
        </div>

        {/* Options */}
        <div className="space-y-3 mb-6">
          <div
            className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
              selectedType === 'online'
                ? 'border-yellow-500 bg-yellow-500 bg-opacity-10'
                : 'border-gray-600 hover:border-gray-500'
            }`}
            onClick={() => setSelectedType('online')}
          >
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-white font-medium">Online Consultation</h4>
                <p className="text-gray-400 text-sm">Video call session</p>
              </div>
              <div className="text-yellow-500 font-bold">R 350.00</div>
            </div>
          </div>

          <div
            className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
              selectedType === 'in-person'
                ? 'border-yellow-500 bg-yellow-500 bg-opacity-10'
                : 'border-gray-600 hover:border-gray-500'
            }`}
            onClick={() => setSelectedType('in-person')}
          >
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-white font-medium">In-Person Consultation</h4>
                <p className="text-gray-400 text-sm">Face-to-face meeting</p>
              </div>
              <div className="text-yellow-500 font-bold">R 600.00</div>
            </div>
          </div>
        </div>

        {/* Selected Option Summary */}
        <div className="mb-6 p-4 bg-gray-700 rounded-lg">
          <h4 className="text-white font-medium mb-2">Selected:</h4>
          <div className="flex justify-between items-center">
            <span className="text-gray-300">
              {consultationOptions[selectedType].name}
            </span>
            <span className="text-yellow-500 font-bold">
              R {consultationOptions[selectedType].price.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleBookConsultation}
            className="flex-1 px-4 py-2 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-400 transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}