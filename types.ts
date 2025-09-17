export enum PhotoType {
  Passport = 'passport',
  License = 'license',
  Resume = 'resume',
  Profile = 'profile',
}

export enum ClothingOption {
  Original = 'original',
  Casual = 'casual',
  Formal = 'formal',
  Custom = 'custom',
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  AI = 'ai',
}

export enum AgeGroup {
  Adult = 'adult',
  Teenager = 'teenager',
  Child = 'child',
  Infant = 'infant',
}

export interface GeneratedImage {
  id: string;
  standard: string; // base64 data URL
  upscaled?: string; // base64 data URL
}

interface BasePhotoSpec {
  name: string;
  size: string;
  features: string[];
}

interface SinglePromptSpec extends BasePhotoSpec {
  prompt: string;
  supportsClothingOptions?: boolean;
}

interface MultiVersionSpec extends BasePhotoSpec {
  prompts: Record<string, string>;
  supportsClothingOptions?: boolean;
}

export interface ProfileSpec extends BasePhotoSpec {
  options: Record<string, { // e.g., 'headshot'
    name: string; // e.g., '헤드샷 (얼굴 중심)'
    prompts: Record<string, string>; // e.g., { classic: '...', modern: '...' }
  }>;
  styleNames: Record<string, string>; // e.g., { classic: '클래식', modern: '모던' }
}

export type PhotoSpec = SinglePromptSpec | MultiVersionSpec | ProfileSpec;