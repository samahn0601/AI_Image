import React from 'react';
import { Gender, AgeGroup } from '../types';

interface SubjectInfoSelectorProps {
  selectedGender: Gender;
  onGenderChange: (gender: Gender) => void;
  selectedAgeGroup: AgeGroup;
  onAgeGroupChange: (ageGroup: AgeGroup) => void;
}

const GENDER_OPTIONS: { key: Gender; name: string }[] = [
  { key: Gender.Male, name: '남성' },
  { key: Gender.Female, name: '여성' },
  { key: Gender.AI, name: 'AI가 판단' },
];

const AGE_GROUP_OPTIONS: { key: AgeGroup; name: string }[] = [
  { key: AgeGroup.Adult, name: '성인' },
  { key: AgeGroup.Teenager, name: '청소년' },
  { key: AgeGroup.Child, name: '어린이' },
  { key: AgeGroup.Infant, name: '영유아' },
];

export const SubjectInfoSelector: React.FC<SubjectInfoSelectorProps> = ({
  selectedGender,
  onGenderChange,
  selectedAgeGroup,
  onAgeGroupChange,
}) => {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <div className="text-center">
          <h3 className="text-xl font-bold text-gray-700">인물 정보 선택</h3>
          <p className="text-gray-500 mt-1">더 정확한 복장 생성을 위해 정보를 선택해주세요.</p>
        </div>
        <div>
            <label className="font-semibold text-gray-600 mb-2 block text-center">성별</label>
            <div className="grid grid-cols-3 gap-3">
                {GENDER_OPTIONS.map(({ key, name }) => {
                    const isSelected = selectedGender === key;
                    return (
                    <button
                        type="button"
                        key={key}
                        onClick={() => onGenderChange(key)}
                        className={`p-3 border-2 rounded-lg cursor-pointer text-center transition-all duration-200 w-full flex items-center justify-center h-full ${
                        isSelected ? 'bg-blue-50 border-blue-500 shadow-sm' : 'bg-white border-gray-200 hover:border-gray-400'
                        }`}
                    >
                        <p className={`font-semibold text-sm ${isSelected ? 'text-blue-700' : 'text-gray-800'}`}>{name}</p>
                    </button>
                    );
                })}
            </div>
        </div>
        <div>
        <label className="font-semibold text-gray-600 mb-2 block text-center">연령대</label>
            <div className="grid grid-cols-2 gap-3">
            {AGE_GROUP_OPTIONS.map(({ key, name }) => {
                    const isSelected = selectedAgeGroup === key;
                    return (
                    <button
                        type="button"
                        key={key}
                        onClick={() => onAgeGroupChange(key)}
                        className={`p-3 border-2 rounded-lg cursor-pointer text-center transition-all duration-200 w-full flex items-center justify-center h-full ${
                        isSelected ? 'bg-blue-50 border-blue-500 shadow-sm' : 'bg-white border-gray-200 hover:border-gray-400'
                        }`}
                    >
                        <p className={`font-semibold text-sm ${isSelected ? 'text-blue-700' : 'text-gray-800'}`}>{name}</p>
                    </button>
                    );
                })}
            </div>
        </div>
      </div>
    </div>
  );
};