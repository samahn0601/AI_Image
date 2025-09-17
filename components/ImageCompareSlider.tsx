import React, { useState, useRef, useCallback } from 'react';

interface ImageCompareSliderProps {
  leftImage: string;
  rightImage: string;
  leftLabel?: string;
  rightLabel?: string;
  onRightImageClick?: () => void;
}

export const ImageCompareSlider: React.FC<ImageCompareSliderProps> = ({
  leftImage,
  rightImage,
  leftLabel = 'Before',
  rightLabel = 'After',
  onRightImageClick,
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    setSliderPosition(percent);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    handleMove(e.touches[0].clientX);
  }, [handleMove]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (e.buttons !== 1) return; // Only move when mouse is down
    handleMove(e.clientX);
  }, [handleMove]);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[3/4] overflow-hidden rounded-lg select-none group cursor-ew-resize"
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
    >
      {/* Right Image (bottom layer) */}
      <button 
        className="w-full h-full p-0 border-0"
        onClick={onRightImageClick}
        aria-label={`${rightLabel} 이미지 확대`}
        >
        <img
            src={rightImage}
            alt={rightLabel}
            className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none"
        />
        <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded-full pointer-events-none">
            {rightLabel}
        </div>
      </button>

      {/* Left Image (top layer, clipped) */}
      <div
        className="absolute top-0 left-0 h-full w-full overflow-hidden pointer-events-none"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img
          src={leftImage}
          alt={leftLabel}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded-full">
            {leftLabel}
        </div>
      </div>

      {/* Slider Handle */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white bg-opacity-80 pointer-events-none group-hover:bg-opacity-100 transition-opacity"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-8 w-8 rounded-full bg-white bg-opacity-80 shadow-md flex items-center justify-center group-hover:bg-opacity-100 transition-opacity">
          <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4"></path>
          </svg>
        </div>
      </div>
    </div>
  );
};
