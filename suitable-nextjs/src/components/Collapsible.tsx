import { PropsWithChildren, useState } from 'react';
import { ChevronDown } from 'lucide-react';

export function Collapsible({ children, title }: PropsWithChildren & { title: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-600 rounded-lg overflow-hidden">
      <button
        className="w-full flex justify-between items-center p-4 bg-gray-800 hover:bg-gray-700 transition-colors"
        onClick={() => setIsOpen((value) => !value)}
      >
        <span className="text-white font-medium">{title}</span>
        <ChevronDown 
          size={20} 
          className={`text-white transition-transform ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>
      {isOpen && (
        <div className="p-4 bg-gray-900">
          {children}
        </div>
      )}
    </div>
  );
}