import React from 'react';
import { ClothingOption } from '../types';
import { CLOTHING_OPTIONS } from '../constants';

interface ClothingSelectorProps {
  selectedOption: ClothingOption;
  onOptionChange: (option: ClothingOption) => void;
}

export const ClothingSelector: React.FC<ClothingSelectorProps> = ({ selectedOption, onOptionChange }) => {
  return (
    <div className="space-y-4">
        <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-700">3. 복장 선택</h2>
            <p className="text-gray-500 mt-1">원하는 복장 스타일을 선택하세요.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {(Object.keys(CLOTHING_OPTIONS) as Array<ClothingOption>).map((key) => {
            const { name } = CLOTHING_OPTIONS[key];
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