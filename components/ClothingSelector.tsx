import React from 'react';
import { ClothingOption } from '../types';
import { CLOTHING_OPTIONS } from '../constants';
import { UserIcon } from './icons/UserIcon';
import { BriefcaseIcon } from './icons/BriefcaseIcon';
import { CheckCircleIcon } from './icons/CheckCircleIcon';
import { TShirtIcon } from './icons/TShirtIcon';
import { PlusIcon } from './icons/PlusIcon';

interface ClothingSelectorProps {
  selectedOption: ClothingOption;
  onOptionChange: (option: ClothingOption) => void;
}

const ICONS: Record<ClothingOption, React.FC<React.SVGProps<SVGSVGElement>>> = {
    [ClothingOption.Original]: UserIcon,
    [ClothingOption.Casual]: TShirtIcon,
    [ClothingOption.Formal]: BriefcaseIcon,
    [ClothingOption.Custom]: PlusIcon,
};

export const ClothingSelector: React.FC<ClothingSelectorProps> = ({ selectedOption, onOptionChange }) => {
  return (
    <div className="space-y-4">
        <div className="text-center">
            <h3 className="text-xl font-bold text-gray-700">복장 선택</h3>
            <p className="text-gray-500 mt-1">원하는 복장 스타일을 선택하세요.</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {(Object.keys(CLOTHING_OPTIONS) as Array<ClothingOption>).map((key) => {
            const { name } = CLOTHING_OPTIONS[key];
            const isSelected = selectedOption === key;
            const Icon = ICONS[key];
            return (
            <button
                type="button"
                key={key}
                onClick={() => onOptionChange(key)}
                className={`relative group p-4 border-2 rounded-xl cursor-pointer text-center transition-all duration-300 w-full flex flex-col items-center justify-center space-y-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 min-h-[7rem] transform hover:-translate-y-1 ${
                isSelected 
                    ? 'bg-blue-50 border-blue-600 shadow-lg' 
                    : 'bg-gray-50 border-gray-200 hover:border-blue-400 hover:shadow-md'
                }`}
            >
                <Icon className={`w-8 h-8 transition-colors duration-300 ${isSelected ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-500'}`} />
                <p className={`font-bold text-sm transition-colors duration-300 ${isSelected ? 'text-blue-700' : 'text-gray-700'}`}>{name}</p>
                {isSelected && (
                    <div className="absolute top-2 right-2">
                        <CheckCircleIcon className="w-6 h-6 text-blue-600 bg-white rounded-full" />
                    </div>
                )}
            </button>
            );
        })}
        </div>
    </div>
  );
};
