import React from 'react';
import { X } from 'lucide-react';

const Popup = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4 relative animate-fade-in shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Success!</h3>
          <p className="text-gray-600">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default Popup;