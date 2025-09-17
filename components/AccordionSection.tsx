import React from 'react';
import { ChevronDownIcon } from './icons/ChevronDownIcon';
import { CheckCircleIcon } from './icons/CheckCircleIcon';

interface AccordionSectionProps {
  title: string;
  summary?: string;
  isOpen: boolean;
  isCompleted: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

export const AccordionSection: React.FC<AccordionSectionProps> = ({ title, summary, isOpen, isCompleted, onToggle, children }) => {
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden transition-all duration-300">
      <button
        onClick={onToggle}
        className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300"
        aria-expanded={isOpen}
      >
        <div className="flex items-center space-x-3 text-left">
          {isCompleted ? (
            <CheckCircleIcon className="w-6 h-6 text-green-500 flex-shrink-0" />
          ) : (
            <div className={`w-6 h-6 rounded-full border-2 flex-shrink-0 ${isOpen ? 'border-blue-500 bg-blue-100' : 'border-gray-400'}`} />
          )}
          <div className="flex-grow">
            <h3 className="text-lg font-bold text-gray-800">{title}</h3>
            {!isOpen && summary && <p className="text-sm text-gray-500 mt-1 truncate">{summary}</p>}
          </div>
        </div>
        <ChevronDownIcon className={`w-5 h-5 text-gray-500 transition-transform flex-shrink-0 ${isOpen ? 'transform rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="p-6 bg-white border-t border-gray-200">
          {children}
        </div>
      )}
    </div>
  );
};
