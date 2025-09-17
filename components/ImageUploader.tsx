import React, { useRef, useState, useCallback } from 'react';
import { CameraIcon } from './icons/CameraIcon';

interface ImageUploaderProps {
  onFileSelect: (file: File) => void;
  uploadedFile: File | null;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onFileSelect, uploadedFile }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileSelect(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = useCallback((event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
  }, []);

  const handleDrop = useCallback((event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      onFileSelect(file);
       const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, [onFileSelect]);

  if (uploadedFile && preview) {
    return (
      <div className="w-full aspect-square rounded-lg overflow-hidden border-2 border-dashed border-gray-300 relative">
        <img src={preview} alt="Uploaded preview" className="w-full h-full object-cover" />
      </div>
    );
  }

  return (
    <label
      htmlFor="dropzone-file"
      className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center justify-center pt-5 pb-6">
        <CameraIcon className="w-10 h-10 mb-3 text-gray-400" />
        <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">클릭하여 업로드</span> 또는 드래그 앤 드롭</p>
        <p className="text-xs text-gray-500">PNG, JPG, WEBP (MAX. 10MB)</p>
      </div>
      <input
        ref={fileInputRef}
        id="dropzone-file"
        type="file"
        className="hidden"
        onChange={handleFileChange}
        accept="image/png, image/jpeg, image/webp"
      />
    </label>
  );
};
