import React, { useState, useCallback, useEffect } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { PhotoTypeSelector } from './components/PhotoTypeSelector';
import { GeneratedImageView } from './components/GeneratedImageView';
import { LoadingSpinner } from './components/LoadingSpinner';
import { PhotoType, ProfileSpec, PhotoSpec } from './types';
import { PHOTO_SPECS, CLOTHING_OPTIONS } from './constants';
import { editIdPhoto } from './services/geminiService';
import { FramingSelector } from './components/FramingSelector';
import { ClothingSelector } from './components/ClothingSelector';
import { ClothingOption } from './types';
import { Modal } from './components/Modal';

interface UploadedFile {
  file: File;
  base64: string;
}

const App: React.FC = () => {
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
  const [photoType, setPhotoType] = useState<PhotoType>(PhotoType.Passport);
  const [framingOption, setFramingOption] = useState<string | null>(null);
  const [clothingOption, setClothingOption] = useState<ClothingOption>(ClothingOption.Original);
  const [generatedImages, setGeneratedImages] = useState<string[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [modalImageSrc, setModalImageSrc] = useState<string | null>(null);

  useEffect(() => {
    const spec = PHOTO_SPECS[photoType];
    // When photo type changes, set the default framing option if it's a profile photo
    if (photoType === PhotoType.Profile) {
      const defaultOption = Object.keys((spec as ProfileSpec).options)[0];
      setFramingOption(defaultOption);
    } else {
      setFramingOption(null);
    }
    // Reset clothing option if the new type doesn't support it
    if (!('supportsClothingOptions' in spec && spec.supportsClothingOptions)) {
      setClothingOption(ClothingOption.Original);
    }

  }, [photoType]);


  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Please upload a valid image file.');
      return;
    }
    setError(null);
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = (reader.result as string).split(',')[1];
      setUploadedFile({ file, base64 });
      setGeneratedImages(null);
    };
    reader.onerror = () => {
      setError('Failed to read the file.');
    };
    reader.readAsDataURL(file);
  };

  const handleGeneration = useCallback(async () => {
    if (!uploadedFile) {
      setError('Please upload an image first.');
      return;
    }
    if (photoType === PhotoType.Profile && !framingOption) {
      setError('Please select a framing option for the profile photo.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImages(null);

    try {
      const spec = PHOTO_SPECS[photoType];
      let results: string[] = [];
      const clothingPrompt = ('supportsClothingOptions' in spec && spec.supportsClothingOptions) 
        ? CLOTHING_OPTIONS[clothingOption].prompt 
        : '';

      if ('options' in spec) { // Profile photo with framing options
        const profileSpec = spec as ProfileSpec;
        const selectedOptionPrompts = profileSpec.options[framingOption!].prompts;
        
        const prompts = Object.values(selectedOptionPrompts);
        const generationPromises = prompts.map(prompt =>
          editIdPhoto(uploadedFile.base64, uploadedFile.file.type, prompt)
        );
        const resolvedResults = await Promise.all(generationPromises);
        results.push(...resolvedResults);

      } else if ('prompts' in spec) { // Multi-version photo (Resume)
        const prompts = Object.values(spec.prompts).map(p => `${p}\n${clothingPrompt}`);
        const generationPromises = prompts.map(prompt =>
          editIdPhoto(uploadedFile.base64, uploadedFile.file.type, prompt)
        );
        const resolvedResults = await Promise.all(generationPromises);
        results.push(...resolvedResults);
      } else { // Single-version photo (Passport, License)
        const finalPrompt = `${spec.prompt}\n${clothingPrompt}`;
        const resultBase64 = await editIdPhoto(uploadedFile.base64, uploadedFile.file.type, finalPrompt);
        results.push(resultBase64);
      }
      
      setGeneratedImages(results.map(base64 => `data:image/png;base64,${base64}`));

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred during image generation.');
    } finally {
      setIsLoading(false);
    }
  }, [uploadedFile, photoType, framingOption, clothingOption]);

  const handleReset = () => {
    setUploadedFile(null);
    setGeneratedImages(null);
    setError(null);
    setIsLoading(false);
  };

  const currentSpec = PHOTO_SPECS[photoType];
  const showClothingSelector = uploadedFile && 'supportsClothingOptions' in currentSpec && currentSpec.supportsClothingOptions;

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      <Header />
      <main className="container mx-auto p-4 md:p-8 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column: Upload & Options */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 flex flex-col space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-700">1. 사진 업로드</h2>
              <p className="text-gray-500 mt-1">증명사진으로 만들고 싶은 사진을 올려주세요.</p>
            </div>
            <ImageUploader onFileSelect={handleFileSelect} uploadedFile={uploadedFile?.file ?? null} />
            
            {uploadedFile && (
              <>
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-700 mt-4">2. 사진 종류 선택</h2>
                  <p className="text-gray-500 mt-1">원하는 증명사진의 종류를 선택하세요.</p>
                </div>
                <PhotoTypeSelector selectedType={photoType} onTypeChange={setPhotoType} />

                {showClothingSelector && (
                    <ClothingSelector 
                        selectedOption={clothingOption}
                        onOptionChange={setClothingOption}
                    />
                )}

                {photoType === PhotoType.Profile && framingOption && (
                  <FramingSelector
                    options={(currentSpec as ProfileSpec).options}
                    selectedOption={framingOption}
                    onOptionChange={setFramingOption}
                  />
                )}

                <button
                  onClick={handleGeneration}
                  disabled={isLoading}
                  className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center text-lg mt-4"
                >
                  {isLoading ? '생성 중...' : '사진 생성하기'}
                </button>
              </>
            )}
          </div>

          {/* Right Column: Result */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 flex flex-col justify-center items-center min-h-[400px] lg:min-h-full">
            <h2 className="text-2xl font-bold text-gray-700 mb-4 text-center">결과</h2>
            {isLoading && <LoadingSpinner />}
            {error && <p className="text-red-500 text-center bg-red-50 p-3 rounded-lg">{error}</p>}
            
            {!isLoading && uploadedFile && generatedImages && generatedImages.length > 0 && (
              <GeneratedImageView
                originalImageSrc={URL.createObjectURL(uploadedFile.file)}
                generatedImageSrcs={generatedImages}
                spec={currentSpec}
                framingOption={framingOption ?? undefined}
                onReset={handleReset}
                onImageClick={setModalImageSrc}
              />
            )}

            {!isLoading && (!generatedImages || generatedImages.length === 0) && !error && (
              <div className="text-center text-gray-400">
                <p>사진을 업로드하고 생성 버튼을 누르면</p>
                <p>AI가 편집한 결과가 여기에 표시됩니다.</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Modal src={modalImageSrc} onClose={() => setModalImageSrc(null)} />
    </div>
  );
};

export default App;