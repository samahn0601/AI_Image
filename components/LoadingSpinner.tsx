
import React, { useState, useEffect } from 'react';

const messages = [
  "AI가 사진을 분석하고 있습니다...",
  "규격에 맞게 이미지를 조정 중입니다.",
  "배경을 깔끔하게 정리하고 있습니다.",
  "최상의 결과를 위해 마무리 작업 중...",
  "거의 다 되었습니다. 잠시만 기다려주세요."
];

export const LoadingSpinner: React.FC = () => {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 3000); // Change message every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center text-center p-4">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-lg font-semibold text-gray-700">{messages[messageIndex]}</p>
    </div>
  );
};
