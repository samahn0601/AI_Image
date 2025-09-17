import React, { useEffect } from 'react';
import { CloseIcon } from './icons/CloseIcon';

interface ModalProps {
  src: string | null;
  onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({ src, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!src) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 transition-opacity duration-300"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative max-w-4xl max-h-full"
        onClick={(e) => e.stopPropagation()}
      >
        <img src={src} alt="Enlarged view" className="block max-h-[90vh] w-auto h-auto object-contain rounded-lg shadow-2xl" />
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 bg-white rounded-full p-2 text-gray-800 hover:bg-gray-200 transition-colors shadow-lg"
          aria-label="Close image viewer"
        >
          <CloseIcon className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};
