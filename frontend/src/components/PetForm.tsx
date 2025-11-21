import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import logoImage from "figma:asset/13429f3bf73f16f4f94cb74ce47b8a5ef9aa39a9.png";

interface Pet {
  id?: number;
  name: string;
  gender: string;
  age: number;
  size: string;
  birthday?: string;
  weight?: number;
  personality?: string;
  photo?: string;
}

interface PetFormProps {
  pet?: Pet;
  onSubmit: (pet: Omit<Pet, "id">) => void;
  onBack: () => void;
}

export function PetForm({ pet, onSubmit, onBack }: PetFormProps) {
  const [formData, setFormData] = useState<Omit<Pet, "id">>({
    name: pet?.name || "",
    gender: pet?.gender || "",
    age: pet?.age || 0,
    size: pet?.size || "",
    birthday: pet?.birthday || "",
    weight: pet?.weight || undefined,
    personality: pet?.personality || "",
    photo: pet?.photo || "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  const handleSubmit = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name) newErrors.name = "이름을 입력하세요";
    if (!formData.gender) newErrors.gender = "성별을 선택하세요";
    if (!formData.age || formData.age <= 0)
      newErrors.age = "나이를 입력하세요";
    if (!formData.size) newErrors.size = "크기를 선택하세요";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit(formData);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10 shadow-sm">
        <div className="max-w-[2520px] mx-auto px-6 lg:px-20 h-20 flex items-center">
          <button onClick={onBack} className="hover:opacity-70 transition-opacity">
            <img src={logoImage} alt="어디가개" className="h-20" />
          </button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-12">
        <div className="p-8 bg-white rounded-2xl border border-gray-100 shadow-sm">
          {/* Header */}
          <div className="flex flex-col items-center mb-8">
            <img src={logoImage} alt="어디가개" className="h-24 mb-4" />
            <h1 className="text-3xl mb-2">
              {pet ? "반려동물 정보 수정" : "반려동물 등록"}
            </h1>
            <p className="text-gray-600">
              반려동물의 정보를 입력해주세요
            </p>
          </div>

          {/* Form */}
          <div className="space-y-6">
            {/* Name */}
            <div>
              <Label htmlFor="name">
                이름 <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="반려동물의 이름"
                className={`mt-1 ${errors.name ? "border-red-500" : ""}`}
              />
              {errors.name && (
                <p className="text-sm text-red-500 mt-1">{errors.name}</p>
              )}
            </div>

            {/* Gender & Age */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="gender">
                  성별 <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.gender}
                  onValueChange={(value) => handleChange("gender", value)}
                >
                  <SelectTrigger
                    className={`mt-1 ${errors.gender ? "border-red-500" : ""}`}
                  >
                    <SelectValue placeholder="성별 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="남아">남아</SelectItem>
                    <SelectItem value="여아">여아</SelectItem>
                  </SelectContent>
                </Select>
                {errors.gender && (
                  <p className="text-sm text-red-500 mt-1">{errors.gender}</p>
                )}
              </div>

              <div>
                <Label htmlFor="age">
                  나이 <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="age"
                  type="number"
                  min="0"
                  value={formData.age || ""}
                  onChange={(e) =>
                    handleChange("age", parseInt(e.target.value) || 0)
                  }
                  placeholder="나이 (년)"
                  className={`mt-1 ${errors.age ? "border-red-500" : ""}`}
                />
                {errors.age && (
                  <p className="text-sm text-red-500 mt-1">{errors.age}</p>
                )}
              </div>
            </div>

            {/* Size */}
            <div>
              <Label htmlFor="size">
                크기 <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.size}
                onValueChange={(value) => handleChange("size", value)}
              >
                <SelectTrigger
                  className={`mt-1 ${errors.size ? "border-red-500" : ""}`}
                >
                  <SelectValue placeholder="크기 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="소형견">소형견 (0-10kg)</SelectItem>
                  <SelectItem value="중형견">중형견 (10-25kg)</SelectItem>
                  <SelectItem value="대형견">대형견 (25kg 이상)</SelectItem>
                </SelectContent>
              </Select>
              {errors.size && (
                <p className="text-sm text-red-500 mt-1">{errors.size}</p>
              )}
            </div>

            {/* Birthday */}
            <div>
              <Label htmlFor="birthday">생일 (선택)</Label>
              <Input
                id="birthday"
                value={formData.birthday}
                onChange={(e) =>
                  handleChange(
                    "birthday",
                    e.target.value.replace(/\D/g, "")
                  )
                }
                placeholder="YYYYMMDD (예: 20220315)"
                maxLength={8}
                className="mt-1"
              />
            </div>

            {/* Weight */}
            <div>
              <Label htmlFor="weight">몸무게 (선택)</Label>
              <Input
                id="weight"
                type="number"
                step="0.1"
                min="0"
                value={formData.weight || ""}
                onChange={(e) =>
                  handleChange("weight", parseFloat(e.target.value) || undefined)
                }
                placeholder="몸무게 (kg)"
                className="mt-1"
              />
            </div>

            {/* Personality */}
            <div>
              <Label htmlFor="personality">성격 (선택)</Label>
              <Textarea
                id="personality"
                value={formData.personality}
                onChange={(e) => handleChange("personality", e.target.value)}
                placeholder="반려동물의 성격을 자유롭게 적어주세요"
                rows={3}
                className="mt-1 resize-none"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-8">
            <Button onClick={onBack} variant="outline" className="flex-1">
              취소
            </Button>
            <Button
              onClick={handleSubmit}
              className="flex-1 bg-gradient-to-r from-yellow-200 to-yellow-300 hover:from-yellow-300 hover:to-yellow-400 text-gray-900"
            >
              {pet ? "수정 완료" : "등록하기"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
