import React from 'react';
import { DownloadIcon } from './icons/DownloadIcon';
import { RetryIcon } from './icons/RetryIcon';
import { PhotoSpec, ProfileSpec } from '../types';

interface GeneratedImageViewProps {
  originalImageSrc: string;
  generatedImageSrcs: string[];
  spec: PhotoSpec;
  framingOption?: string;
  onReset: () => void;
}

export const GeneratedImageView: React.FC<GeneratedImageViewProps> = ({ originalImageSrc, generatedImageSrcs, spec, framingOption, onReset }) => {
  const totalImages = 1 + generatedImageSrcs.length;

  const isResume = 'prompts' in spec && !('options' in spec);
  const isProfile = 'options' in spec;
  
  let versionKeys: string[] = [];
  if (isResume) {
    versionKeys = Object.keys(spec.prompts);
  } else if (isProfile && framingOption) {
    versionKeys = Object.keys((spec as ProfileSpec).options[framingOption].prompts);
  }

  const getLabel = (index: number) => {
    if (isResume) {
      const key = versionKeys[index];
      return key === 'natural' ? '결과 (자연스러운 표정)' : '결과 (자신있는 미소)';
    }
    if (isProfile) {
      const styleKey = versionKeys[index];
      const styleName = (spec as ProfileSpec).styleNames[styleKey] || styleKey;
      return `결과 (${styleName})`;
    }
    return '결과';
  };
  
  const getVersionName = (index: number) => {
    if (isResume) {
        const key = versionKeys[index];
        return key === 'natural' ? '자연스러운 표정' : '자신있는 미소';
    }
    if (isProfile) {
        const styleKey = versionKeys[index];
        return (spec as ProfileSpec).styleNames[styleKey] || styleKey;
    }
    return '사진';
  }

  const getDownloadFilename = (index: number) => {
     if (isResume) {
        const key = versionKeys[index];
        return `ai_resume_${key}.png`;
    }
     if (isProfile && framingOption) {
        const styleKey = versionKeys[index];
        return `ai_profile_${framingOption}_${styleKey}.png`;
    }
    const typeName = spec.name.split(' ')[0].toLowerCase().replace('/', '_');
    return `ai_${typeName}.png`;
  };
  
  const gridColsClass = totalImages > 2 ? 'md:grid-cols-2 lg:grid-cols-2' : 'md:grid-cols-2';

  return (
    <div className="w-full flex flex-col items-center space-y-6">
      <div className={`grid grid-cols-1 ${gridColsClass} gap-4 w-full`}>
        <div className="text-center">
          <p className="font-semibold mb-2 text-gray-600">원본</p>
          <img src={originalImageSrc} alt="Original" className="rounded-lg shadow-md w-full object-contain" />
        </div>
        {generatedImageSrcs.map((src, index) => (
          <div key={index} className="text-center">
            <p className="font-semibold mb-2 text-gray-600">{getLabel(index)}</p>
            <img src={src} alt={`Generated ${index + 1}`} className="rounded-lg shadow-md w-full object-contain" />
          </div>
        ))}
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
        {generatedImageSrcs.map((src, index) => (
          <a
            key={index}
            href={src}
            download={getDownloadFilename(index)}
            className="flex-1 bg-green-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-600 transition-colors duration-300 flex flex-col items-center justify-center text-center"
          >
            <span className="leading-tight">{getVersionName(index)}</span>
            <span className="flex items-center leading-tight mt-1">
              <DownloadIcon className="w-4 h-4 mr-1" />
              다운로드
            </span>
          </a>
        ))}
         </div>
      <div className="w-full mt-2">
        <button
          onClick={onReset}
          className="w-full bg-gray-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-gray-600 transition-colors duration-300 flex items-center justify-center"
        >
          <RetryIcon className="w-5 h-5 mr-2" />
          처음으로 돌아가기
        </button>
      </div>
    </div>
  );
};