import React from 'react';

interface BackgroundColorSelectorProps {
  selectedColor: string;
  onColorChange: (color: string) => void;
}

const PRESET_COLORS = [
  { name: 'Slate', value: '#F1F5F9' },
  { name: 'Blue', value: '#DBEAFE' },
  { name: 'Beige', value: '#F0EBE5' },
  { name: 'White', value: '#FFFFFF' },
];

export const BackgroundColorSelector: React.FC<BackgroundColorSelectorProps> = ({ selectedColor, onColorChange }) => {
  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-xl font-bold text-gray-700">배경 색상 선택</h3>
        <p className="text-gray-500 mt-1">이력서 사진의 배경색을 선택하세요.</p>
      </div>
      <div className="flex justify-center items-center gap-4 flex-wrap">
        {PRESET_COLORS.map(({ name, value }) => (
          <button
            key={name}
            type="button"
            onClick={() => onColorChange(value)}
            className={`w-12 h-12 rounded-full border-2 transition-transform transform hover:scale-110 ${
              selectedColor.toUpperCase() === value.toUpperCase() ? 'border-blue-500 ring-2 ring-blue-500 ring-offset-2' : 'border-gray-300'
            }`}
            style={{ backgroundColor: value }}
            aria-label={`Select ${name} color`}
          />
        ))}
        <div className="relative w-12 h-12">
            <input
                type="color"
                value={selectedColor}
                onChange={(e) => onColorChange(e.target.value)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                id="color-picker"
            />
            <label
                htmlFor="color-picker"
                className={`w-12 h-12 block rounded-full border-2 transition-transform transform hover:scale-110 cursor-pointer ${
                     !PRESET_COLORS.some(p => p.value.toUpperCase() === selectedColor.toUpperCase()) ? 'border-blue-500 ring-2 ring-blue-500 ring-offset-2' : 'border-gray-300'
                }`}
                style={{ 
                    backgroundColor: selectedColor,
                    backgroundImage: !PRESET_COLORS.some(p => p.value.toUpperCase() === selectedColor.toUpperCase()) 
                        ? 'none'
                        : `linear-gradient(45deg, #ff0000, #ff00ff, #0000ff, #00ffff, #00ff00, #ffff00, #ff0000)`,
                    backgroundSize: '400% 400%',
                }}
            />
        </div>
      </div>
    </div>
  );
};