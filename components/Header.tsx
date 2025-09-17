
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 md:px-8">
        <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">
          <span className="text-blue-600">AI</span> 한국 증명사진 편집기
        </h1>
        <p className="text-gray-500 mt-1">AI로 간편하게 여권, 운전면허, 이력서 사진을 만들어보세요.</p>
      </div>
    </header>
  );
};
