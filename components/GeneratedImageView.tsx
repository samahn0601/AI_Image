import React from 'react';
import { DownloadIcon } from './icons/DownloadIcon';
import { RetryIcon } from './icons/RetryIcon';
import { PhotoSpec, ProfileSpec, GeneratedImage } from '../types';
import { SparklesIcon } from './icons/SparklesIcon';
import { CheckCircleIcon } from './icons/CheckCircleIcon';
import { ImageCompareSlider } from './ImageCompareSlider';

interface GeneratedImageViewProps {
  originalImageSrc: string;
  generatedImages: GeneratedImage[];
  spec: PhotoSpec;
  framingOption?: string;
  onReset: () => void;
  onImageClick: (src: string) => void;
  onUpscale: (imageId: string) => void;
  upscalingId: string | null;
}

const ButtonSpinner: React.FC = () => (
    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);


export const GeneratedImageView: React.FC<GeneratedImageViewProps> = ({ originalImageSrc, generatedImages, spec, framingOption, onReset, onImageClick, onUpscale, upscalingId }) => {
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
      return key === 'natural' ? '자연스러운 표정' : '자신있는 미소';
    }
    if (isProfile) {
      const styleKey = versionKeys[index];
      const styleName = (spec as ProfileSpec).styleNames[styleKey] || styleKey;
      return `${styleName}`;
    }
    // For single-result types like Passport/License
    return spec.name.split(' (')[0];
  };

  const getDownloadFilename = (index: number) => {
     if (isResume) {
        const key = versionKeys[index];
        return `nyangnyang_resume_${key}.png`;
    }
     if (isProfile && framingOption) {
        const styleKey = versionKeys[index];
        return `nyangnyang_profile_${framingOption}_${styleKey}.png`;
    }
    const typeName = spec.name.split(' ')[0].toLowerCase().replace('/', '_');
    return `nyangnyang_${typeName}.png`;
  };
  
  const showSlider = generatedImages.length === 1;

  return (
    <div className="w-full flex flex-col items-center space-y-6">
      {showSlider ? (
        // Single Image View with Slider
        (() => {
          const image = generatedImages[0];
          const isUpscaling = upscalingId === image.id;
          const hasUpscaled = !!image.upscaled;
          const displaySrc = image.upscaled || image.standard;
          return (
            <div className="text-center flex flex-col w-full max-w-sm">
              <p className="font-semibold mb-2 text-gray-600">{getLabel(0)}</p>
              <ImageCompareSlider
                leftImage={originalImageSrc}
                rightImage={displaySrc}
                leftLabel="원본"
                rightLabel="결과"
                onRightImageClick={() => onImageClick(displaySrc)}
              />
              <div className="grid grid-cols-2 gap-2 mt-3">
                <button
                  onClick={() => onUpscale(image.id)}
                  disabled={isUpscaling || hasUpscaled}
                  className={`w-full text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center text-sm ${hasUpscaled ? 'bg-green-600 cursor-default' : 'bg-purple-600 hover:bg-purple-700'} ${isUpscaling ? 'bg-purple-400 cursor-not-allowed' : ''}`}
                >
                  {isUpscaling ? <><ButtonSpinner /> 변환 중...</> : hasUpscaled ? <><CheckCircleIcon className="w-4 h-4 mr-2" /> 완료</> : <><SparklesIcon className="w-4 h-4 mr-2" /> 고화질 변환</>}
                </button>
                <a href={displaySrc} download={getDownloadFilename(0)} className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center text-sm">
                  <DownloadIcon className="w-4 h-4 mr-2" />
                  <span>다운로드</span>
                </a>
              </div>
            </div>
          );
        })()
      ) : (
        // Multi-Image View (Grid)
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
          <div className="text-center">
            <p className="font-semibold mb-2 text-gray-600">원본</p>
            <div className="aspect-[3/4] rounded-lg overflow-hidden border border-gray-200 shadow-sm cursor-pointer">
              <img src={originalImageSrc} alt="Original" className="w-full h-full object-cover" onClick={() => onImageClick(originalImageSrc)} />
            </div>
          </div>
          {generatedImages.map((image, index) => {
            const isUpscaling = upscalingId === image.id;
            const hasUpscaled = !!image.upscaled;
            const displaySrc = image.upscaled || image.standard;
            return (
              <div key={image.id} className="text-center flex flex-col">
                <p className="font-semibold mb-2 text-gray-600">{getLabel(index)}</p>
                <div className="aspect-[3/4] rounded-lg overflow-hidden border border-gray-200 shadow-sm mb-3 cursor-pointer">
                  <img src={displaySrc} alt={getLabel(index)} className="w-full h-full object-cover" onClick={() => onImageClick(displaySrc)} />
                </div>
                <div className="grid grid-cols-2 gap-2 mt-auto">
                  <button
                    onClick={() => onUpscale(image.id)}
                    disabled={isUpscaling || hasUpscaled}
                    className={`w-full text-white font-bold py-2 px-3 rounded-lg transition-colors duration-300 flex items-center justify-center text-xs ${hasUpscaled ? 'bg-green-600 cursor-default' : 'bg-purple-600 hover:bg-purple-700'} ${isUpscaling ? 'bg-purple-400 cursor-not-allowed' : ''}`}
                  >
                    {isUpscaling ? <><ButtonSpinner /> 변환 중</> : hasUpscaled ? <><CheckCircleIcon className="w-4 h-4 mr-1" /> 완료</> : <><SparklesIcon className="w-4 h-4 mr-1" /> 고화질</>}
                  </button>
                  <a href={displaySrc} download={getDownloadFilename(index)} className="w-full bg-blue-600 text-white font-bold py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center text-xs">
                    <DownloadIcon className="w-4 h-4 mr-1" />
                    <span>다운로드</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="w-full mt-4">
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