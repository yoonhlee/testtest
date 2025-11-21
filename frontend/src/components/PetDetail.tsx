import { Button } from "./ui/button";
import {
  Edit2,
  Trash2,
  Calendar,
  Scale,
  Heart,
} from "lucide-react";
import examplePetImage from "figma:asset/5d92d773f1fa8e0409e21836092370ba91c3abf9.png";
import logoImage from "figma:asset/13429f3bf73f16f4f94cb74ce47b8a5ef9aa39a9.png";

interface Pet {
  id: number;
  name: string;
  breed: string;
  age: number;
  size: string;
  gender?: string;
  birthday?: string;
  weight?: number;
  personality?: string;
  photo?: string;
  registrationDate?: string;
  lastVaccineDate?: string;
}

interface PetDetailProps {
  pet: Pet;
  onBack: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function PetDetail({ pet, onBack, onEdit, onDelete }: PetDetailProps) {
  // Format date from YYYYMMDD to YYYY년 MM월 DD일
  const formatDate = (dateStr?: string) => {
    if (!dateStr || dateStr.length !== 8) return "-";
    const year = dateStr.substring(0, 4);
    const month = dateStr.substring(4, 6);
    const day = dateStr.substring(6, 8);
    return `${year}년 ${month}월 ${day}일`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-[800px] mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="hover:opacity-70 transition-opacity">
              <img src={logoImage} alt="어디가개" className="h-20" />
            </button>
            <h1 className="text-xl">{pet.name}</h1>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={onEdit}
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
            >
              <Edit2 className="w-4 h-4" />
              수정
            </Button>
            <Button
              onClick={onDelete}
              variant="outline"
              size="sm"
              className="flex items-center gap-1 text-red-500 hover:text-red-600 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4" />
              삭제
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-[800px] mx-auto px-6 py-8">
        {/* Main Card */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
          {/* Profile Photo */}
          <div className="flex justify-center mb-8">
            <div className="w-40 h-40 rounded-full overflow-hidden bg-gray-100">
              <img
                src={examplePetImage}
                alt={pet.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Basic Info Grid */}
          <div className="grid grid-cols-2 gap-8 mb-8">
            {/* Left Column */}
            <div className="space-y-6">
              <div>
                <p className="text-sm text-gray-500 mb-1">이름</p>
                <p className="text-gray-900">{pet.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">성별</p>
                <p className="text-gray-900">{pet.gender || "수컷"}</p>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div>
                <p className="text-sm text-gray-500 mb-1">나이</p>
                <p className="text-gray-900">{pet.age}살</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">크기</p>
                <p className="text-gray-900">{pet.size}</p>
              </div>
            </div>
          </div>

          {/* Additional Info with Icons */}
          <div className="space-y-4 pt-6 border-t border-gray-100">
            {/* Birthday */}
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm text-gray-500 mb-1">생일</p>
                <p className="text-gray-900">{formatDate(pet.birthday)}</p>
              </div>
            </div>

            {/* Weight */}
            <div className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm text-gray-500 mb-1">몸무게</p>
                <p className="text-gray-900">{pet.weight || 15}kg</p>
              </div>
            </div>

            {/* Personality */}
            <div className="flex items-start gap-3">
              <Heart className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm text-gray-500 mb-1">성격</p>
                <p className="text-gray-900">{pet.personality || "활발함"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Registration Info Section */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8">
          <h2 className="text-gray-700 mb-4">등록 정보</h2>
          <div className="space-y-2 text-sm">
            <p className="text-gray-600">
              등록일: {formatDate(pet.registrationDate || "20240315")}
            </p>
            <p className="text-gray-600">
              마지막 수정: {formatDate(pet.lastVaccineDate || "20240315")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
