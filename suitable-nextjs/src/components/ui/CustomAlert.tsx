import React from 'react';

interface CustomAlertProps {
  visible: boolean;
  title: string;
  message: string;
  buttons: Array<{
    text: string;
    onPress: () => void;
    style?: 'default' | 'cancel' | 'destructive';
  }>;
  onDismiss: () => void;
}

export function CustomAlert({
  visible,
  title,
  message,
  buttons,
  onDismiss,
}: CustomAlertProps) {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-sm">
        <h2 className="text-lg font-bold text-gray-900 mb-2">{title}</h2>
        <p className="text-gray-700 mb-6">{message}</p>
        
        <div className="flex flex-col gap-2">
          {buttons.map((button, index) => (
            <button
              key={index}
              onClick={button.onPress}
              className={`px-4 py-2 rounded font-medium ${
                button.style === 'destructive'
                  ? 'bg-red-500 text-white hover:bg-red-600'
                  : button.style === 'cancel'
                  ? 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              {button.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}