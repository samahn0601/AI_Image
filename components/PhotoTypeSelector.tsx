
import React from 'react';
import { PhotoType } from '../types';
import { PHOTO_SPECS } from '../constants';

interface PhotoTypeSelectorProps {
  selectedType: PhotoType;
  onTypeChange: (type: PhotoType) => void;
}

export const PhotoTypeSelector: React.FC<PhotoTypeSelectorProps> = ({ selectedType, onTypeChange }) => {
  return (
    <div className="space-y-3">
      {Object.values(PhotoType).map((type) => {
        const spec = PHOTO_SPECS[type];
        const isSelected = selectedType === type;
        return (
          <div
            key={type}
            onClick={() => onTypeChange(type)}
            className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
              isSelected ? 'bg-blue-50 border-blue-500 shadow-sm' : 'bg-white border-gray-200 hover:border-gray-400'
            }`}
          >
            <div className="flex justify-between items-center">
                <div className="flex items-center">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 ${isSelected ? 'border-blue-500' : 'border-gray-400'}`}>
                        {isSelected && <div className="w-2.5 h-2.5 bg-blue-500 rounded-full"></div>}
                    </div>
                    <div>
                        <p className={`font-bold ${isSelected ? 'text-blue-700' : 'text-gray-800'}`}>{spec.name}</p>
                        <p className="text-sm text-gray-500">{spec.size}</p>
                    </div>
                </div>
            </div>
            <div className="mt-2 pl-8 flex flex-wrap gap-2">
                {spec.features.map(feature => (
                    <span key={feature} className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-full">{feature}</span>
                ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};
