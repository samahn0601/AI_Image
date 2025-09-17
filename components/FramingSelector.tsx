import React from 'react';
import { ProfileSpec } from '../types';

interface FramingSelectorProps {
  options: ProfileSpec['options'];
  selectedOption: string;
  onOptionChange: (option: string) => void;
}

export const FramingSelector: React.FC<FramingSelectorProps> = ({ options, selectedOption, onOptionChange }) => {
  return (
    <div className="space-y-4">
        <div className="text-center">
            <h3 className="text-xl font-bold text-gray-700">구도 선택</h3>
            <p className="text-gray-500 mt-1">원하는 프로필 사진 구도를 선택하세요.</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {Object.entries(options).map(([key, { name }]) => {
            const isSelected = selectedOption === key;
            return (
            <button
                type="button"
                key={key}
                onClick={() => onOptionChange(key)}
                className={`p-3 border-2 rounded-lg cursor-pointer text-center transition-all duration-200 w-full flex items-center justify-center h-full ${
                isSelected ? 'bg-blue-50 border-blue-500 shadow-sm' : 'bg-white border-gray-200 hover:border-gray-400'
                }`}
            >
                <p className={`font-semibold text-sm ${isSelected ? 'text-blue-700' : 'text-gray-800'}`}>{name}</p>
            </button>
            );
        })}
        </div>
    </div>
  );
};
