export enum PhotoType {
  Passport = 'passport',
  License = 'license',
  Resume = 'resume',
  Profile = 'profile',
}

interface BasePhotoSpec {
  name: string;
  size: string;
  features: string[];
}

interface SinglePromptSpec extends BasePhotoSpec {
  prompt: string;
}

interface MultiVersionSpec extends BasePhotoSpec {
  prompts: Record<string, string>;
}

export interface ProfileSpec extends BasePhotoSpec {
  options: Record<string, { // e.g., 'headshot'
    name: string; // e.g., '헤드샷 (얼굴 중심)'
    prompts: Record<string, string>; // e.g., { classic: '...', modern: '...' }
  }>;
  styleNames: Record<string, string>; // e.g., { classic: '클래식', modern: '모던' }
}

export type PhotoSpec = SinglePromptSpec | MultiVersionSpec | ProfileSpec;