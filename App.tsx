import React, { useState, useCallback, useEffect } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { PhotoTypeSelector } from './components/PhotoTypeSelector';
import { GeneratedImageView } from './components/GeneratedImageView';
import { LoadingSpinner } from './components/LoadingSpinner';
import { PhotoType, ProfileSpec, PhotoSpec, Gender, AgeGroup, ClothingOption, GeneratedImage } from './types';
import { PHOTO_SPECS, CLOTHING_OPTIONS } from './constants';
import { editIdPhoto, upscaleImage } from './services/geminiService';
import { FramingSelector } from './components/FramingSelector';
import { ClothingSelector } from './components/ClothingSelector';
import { SubjectInfoSelector } from './components/SubjectInfoSelector';
import { Modal } from './components/Modal';
import { AccordionSection } from './components/AccordionSection';
import { BackgroundColorSelector } from './components/BackgroundColorSelector';


interface UploadedFile {
  file: File;
  base64: string;
}

type ActiveSection = 'upload' | 'type' | 'options';

const App: React.FC = () => {
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
  const [referenceFile, setReferenceFile] = useState<UploadedFile | null>(null);
  const [photoType, setPhotoType] = useState<PhotoType>(PhotoType.Passport);
  const [framingOption, setFramingOption] = useState<string | null>(null);
  const [clothingOption, setClothingOption] = useState<ClothingOption>(ClothingOption.Original);
  const [gender, setGender] = useState<Gender>(Gender.AI);
  const [ageGroup, setAgeGroup] = useState<AgeGroup>(AgeGroup.Adult);
  const [backgroundColor, setBackgroundColor] = useState<string>('#F1F5F9'); // Default: Slate 100
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [modalImageSrc, setModalImageSrc] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<ActiveSection>('upload');
  const [upscalingId, setUpscalingId] = useState<string | null>(null);


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
      setActiveSection('type');
    };
    reader.onerror = () => {
      setError('Failed to read the file.');
    };
    reader.readAsDataURL(file);
  };

  const handleReferenceFileSelect = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Please upload a valid image file for the style reference.');
      return;
    }
    setError(null);
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = (reader.result as string).split(',')[1];
      setReferenceFile({ file, base64 });
    };
    reader.onerror = () => {
      setError('Failed to read the reference file.');
    };
    reader.readAsDataURL(file);
  };

  const handleClothingOptionChange = (option: ClothingOption) => {
    setClothingOption(option);
    if (option !== ClothingOption.Custom) {
        setReferenceFile(null); // Clear reference file if not in custom mode
    }
  };
  
  const handleTypeChange = (type: PhotoType) => {
    setPhotoType(type);
    setActiveSection('options');
  };

  const getSubjectContextPrompt = () => {
    if (gender === Gender.AI && ageGroup === AgeGroup.Adult) {
      return ''; // No override needed for default
    }
    
    const ageTextMap: Record<AgeGroup, string> = {
        [AgeGroup.Infant]: 'an infant or toddler (approx. 0-3 years old)',
        [AgeGroup.Child]: 'a child (approx. 4-12 years old)',
        [AgeGroup.Teenager]: 'a teenager (approx. 13-19 years old)',
        [AgeGroup.Adult]: 'an adult',
    };
    const ageText = ageTextMap[ageGroup];

    let context = '**Critical Subject Context for Attire Generation:** The user has provided specific information about the subject. You MUST adhere to this context to create appropriate clothing.\n';
    
    if (gender === Gender.Male) {
      context += `**Gender Appearance:** The user has specified the subject has a masculine appearance.\n`;
    } else if (gender === Gender.Female) {
      context += `**Gender Appearance:** The user has specified the subject has a feminine appearance.\n`;
    }
    
    context += `**Age Group:** The subject is **${ageText}**.\n`;
    context += '**Instruction:** You MUST generate attire that is perfectly appropriate for this specific age and gender. For example, "Formal Wear" for an infant means a small formal dress or a tiny ceremonial suit, NOT a miniature adult business suit. "Casual Wear" for a teenager should be trendy and age-appropriate, not children\'s clothing or overly mature adult styles. You must adapt your interpretation of the clothing style to fit the specified age group.\n\n';
    return context;
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
    if (clothingOption === ClothingOption.Custom && !referenceFile) {
        setError('Please upload a style reference image.');
        return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImages(null);

    try {
      const spec = PHOTO_SPECS[photoType];
      let results: string[] = [];
      const referenceImagePayload = referenceFile ? { base64: referenceFile.base64, mimeType: referenceFile.file.type } : undefined;
      const supportsClothing = 'supportsClothingOptions' in spec && spec.supportsClothingOptions;
      const subjectContextPrompt = supportsClothing ? getSubjectContextPrompt() : '';
      const isBackgroundColorSupported = photoType === PhotoType.Resume;
      const backgroundColorPrompt = (isBackgroundColorSupported && backgroundColor !== '#F1F5F9') // Do not add for default color
        ? `**Critical Background Instruction:** The user has specified a custom background color. You MUST replace the entire background with a solid, uniform color matching this exact hex code: ${backgroundColor}. All other background instructions in this prompt are secondary to this one.\n\n`
        : '';

      if ('options' in spec) { // Profile photo logic
        const profileSpec = spec as ProfileSpec;
        const selectedOptionPrompts = profileSpec.options[framingOption!].prompts;
        
        const finalPrompts: string[] = [];
        for (const basePrompt of Object.values(selectedOptionPrompts)) {
          let modifiedPrompt = basePrompt;
          if (supportsClothing && clothingOption !== ClothingOption.Original) {
            const clothingPrompt = CLOTHING_OPTIONS[clothingOption].prompt;
            const attireRegex = /\*\*(\d+\.\s*)?Attire:.*?(?=\n\*\*Output:|\s*$)/s;
            modifiedPrompt = basePrompt.replace(attireRegex, clothingPrompt);
          }
          finalPrompts.push(`${backgroundColorPrompt}${subjectContextPrompt}${modifiedPrompt}`);
        }
        
        const generationPromises = finalPrompts.map(prompt =>
          editIdPhoto(uploadedFile.base64, uploadedFile.file.type, prompt, referenceImagePayload)
        );
        const resolvedResults = await Promise.all(generationPromises);
        results.push(...resolvedResults);

      } else { // Logic for Passport, License, Resume
        const clothingPrompt = supportsClothing ? CLOTHING_OPTIONS[clothingOption].prompt : '';
        
        if ('prompts' in spec) { // Resume
          const prompts = Object.values(spec.prompts).map(p => `${backgroundColorPrompt}${subjectContextPrompt}${p}\n${clothingPrompt}`);
          const generationPromises = prompts.map(prompt =>
            editIdPhoto(uploadedFile.base64, uploadedFile.file.type, prompt, referenceImagePayload)
          );
          const resolvedResults = await Promise.all(generationPromises);
          results.push(...resolvedResults);
        } else { // Passport, License
          const finalPrompt = `${backgroundColorPrompt}${subjectContextPrompt}${spec.prompt}\n${clothingPrompt}`;
          const resultBase64 = await editIdPhoto(uploadedFile.base64, uploadedFile.file.type, finalPrompt, referenceImagePayload);
          results.push(resultBase64);
        }
      }
      
      const resultsWithIds: GeneratedImage[] = results.map((base64, index) => ({
        id: `${Date.now()}-${index}`,
        standard: `data:image/png;base64,${base64}`,
      }));
      setGeneratedImages(resultsWithIds);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred during image generation.');
    } finally {
      setIsLoading(false);
    }
  }, [uploadedFile, photoType, framingOption, clothingOption, referenceFile, gender, ageGroup, backgroundColor]);

  const handleUpscale = useCallback(async (imageId: string) => {
    const imageToUpscale = generatedImages?.find(img => img.id === imageId);
    if (!imageToUpscale || imageToUpscale.upscaled) {
      return;
    }

    setUpscalingId(imageId);
    setError(null);

    try {
      const res = await fetch(imageToUpscale.standard);
      const blob = await res.blob();
      
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = async () => {
        try {
            const base64Data = (reader.result as string).split(',')[1];
            const mimeType = blob.type;

            const upscaledBase64 = await upscaleImage(base64Data, mimeType);
            const upscaledSrc = `data:image/png;base64,${upscaledBase64}`;
            
            setGeneratedImages(prevImages =>
              prevImages?.map(img =>
                img.id === imageId ? { ...img, upscaled: upscaledSrc } : img
              ) || null
            );
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred during image upscaling.');
        } finally {
            setUpscalingId(null);
        }
      };
      reader.onerror = () => {
          setError('Failed to process image for upscaling.');
          setUpscalingId(null);
      }
    } catch (err) {
      setError('Could not fetch image data for upscaling.');
      setUpscalingId(null);
    }
  }, [generatedImages]);

  const handleReset = () => {
    setUploadedFile(null);
    setReferenceFile(null);
    setGeneratedImages(null);
    setError(null);
    setIsLoading(false);
    setActiveSection('upload');
  };

  const currentSpec = PHOTO_SPECS[photoType];
  const isBackgroundColorSupported = photoType === PhotoType.Resume;

  const getOptionsSummary = (): string => {
    const summaries = [];
    if (showClothingSelector) {
        if (gender !== Gender.AI) {
            const genderTextMap: Record<Exclude<Gender, Gender.AI>, string> = {
                [Gender.Male]: '남성',
                [Gender.Female]: '여성',
            };
            const ageText = {
                [AgeGroup.Adult]: '성인',
                [AgeGroup.Teenager]: '청소년',
                [AgeGroup.Child]: '어린이',
                [AgeGroup.Infant]: '영유아'
            }[ageGroup];
            summaries.push(`정보: ${genderTextMap[gender]}, ${ageText}`);
        }
        summaries.push(`복장: ${CLOTHING_OPTIONS[clothingOption].name}`);
    }
    if (photoType === PhotoType.Profile && framingOption) {
        const spec = PHOTO_SPECS[photoType] as ProfileSpec;
        summaries.push(`구도: ${spec.options[framingOption].name}`);
    }
    if (isBackgroundColorSupported && backgroundColor !== '#F1F5F9') {
        summaries.push(`배경: ${backgroundColor.toUpperCase()}`);
    }
    if (summaries.length === 0) {
      return '자동 설정';
    }
    return summaries.join(' / ');
  };

  const showClothingSelector = uploadedFile && 'supportsClothingOptions' in currentSpec && currentSpec.supportsClothingOptions;
  const showFramingSelector = uploadedFile && photoType === PhotoType.Profile && framingOption;
  const showOptionsAccordion = showClothingSelector || showFramingSelector || (uploadedFile && isBackgroundColorSupported);

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      <Header />
      <main className="container mx-auto p-4 md:p-8 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column: Upload & Options */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 flex flex-col space-y-4">
            <AccordionSection
              title="사진 업로드"
              isOpen={activeSection === 'upload'}
              isCompleted={!!uploadedFile}
              onToggle={() => !!uploadedFile && setActiveSection('upload')}
              summary={uploadedFile?.file.name}
            >
              <p className="text-gray-500 text-center mb-4">증명사진으로 만들고 싶은 사진을 올려주세요.</p>
              <ImageUploader onFileSelect={handleFileSelect} uploadedFile={uploadedFile?.file ?? null} />
            </AccordionSection>

            {uploadedFile && (
              <>
                <AccordionSection
                  title="사진 종류 선택"
                  isOpen={activeSection === 'type'}
                  isCompleted={true}
                  onToggle={() => setActiveSection('type')}
                  summary={PHOTO_SPECS[photoType].name}
                >
                  <p className="text-gray-500 text-center mb-4">원하는 증명사진의 종류를 선택하세요.</p>
                  <PhotoTypeSelector selectedType={photoType} onTypeChange={handleTypeChange} />
                </AccordionSection>

                {showOptionsAccordion && (
                  <AccordionSection
                    title="세부 옵션 설정"
                    isOpen={activeSection === 'options'}
                    isCompleted={false}
                    onToggle={() => setActiveSection('options')}
                    summary={getOptionsSummary()}
                  >
                    <div className="flex flex-col space-y-8">
                      {showClothingSelector && (
                          <SubjectInfoSelector 
                              selectedGender={gender}
                              onGenderChange={setGender}
                              selectedAgeGroup={ageGroup}
                              onAgeGroupChange={setAgeGroup}
                          />
                      )}
                      
                      {showClothingSelector && (
                          <ClothingSelector 
                              selectedOption={clothingOption}
                              onOptionChange={handleClothingOptionChange}
                          />
                      )}
                      
                      {clothingOption === ClothingOption.Custom && showClothingSelector && (
                          <div className="space-y-4">
                              <div className="text-center">
                                  <h3 className="text-xl font-bold text-gray-700">스타일 레퍼런스</h3>
                                  <p className="text-gray-500 mt-1">적용하고 싶은 의상, 액세서리 이미지를 올려주세요.</p>
                              </div>
                              <ImageUploader onFileSelect={handleReferenceFileSelect} uploadedFile={referenceFile?.file ?? null} />
                          </div>
                      )}

                      {showFramingSelector && (
                        <FramingSelector
                          options={(currentSpec as ProfileSpec).options}
                          selectedOption={framingOption!}
                          onOptionChange={setFramingOption}
                        />
                      )}

                      {isBackgroundColorSupported && (
                        <BackgroundColorSelector 
                          selectedColor={backgroundColor}
                          onColorChange={setBackgroundColor}
                        />
                      )}
                    </div>
                  </AccordionSection>
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
                generatedImages={generatedImages}
                spec={currentSpec}
                framingOption={framingOption ?? undefined}
                onReset={handleReset}
                onImageClick={setModalImageSrc}
                onUpscale={handleUpscale}
                upscalingId={upscalingId}
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