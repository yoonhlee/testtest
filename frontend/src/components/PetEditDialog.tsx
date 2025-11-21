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
import { Dialog, DialogContent } from "./ui/dialog";
import { Camera, ChevronLeft } from "lucide-react";
import examplePetImage from "figma:asset/9cac055f89cea585f871bcf79e3e26af969dd4a9.png";

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

interface PetEditDialogProps {
  open: boolean;
  onClose: () => void;
  pet?: Pet;
  onSave: (pet: Omit<Pet, "id">) => void;
}

export function PetEditDialog({
  open,
  onClose,
  pet,
  onSave,
}: PetEditDialogProps) {
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

  const handleChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[600px] max-h-[90vh] overflow-y-auto p-0">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 z-10">
          <div className="flex items-center gap-4">
            <button onClick={onClose} className="text-gray-600 hover:text-gray-900">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-sm text-gray-500">어디가개</span>
            <h2 className="flex-1 text-center">정보 수정</h2>
            <div className="w-5" /> {/* Spacer for centering */}
          </div>
        </div>

        <div className="px-6 py-6">
          {/* Profile Photo */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100 mb-3 relative">
              <img
                src={examplePetImage}
                alt="Pet profile"
                className="w-full h-full object-cover"
              />
              <button className="absolute bottom-2 right-2 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50">
                <Camera className="w-4 h-4 text-gray-600" />
              </button>
            </div>
            <p className="text-sm text-gray-500">사진 추가 (선택)</p>
          </div>

          {/* Required Info Section */}
          <div className="mb-8">
            <h3 className="mb-4 text-gray-700">필수 정보</h3>

            {/* Name */}
            <div className="mb-4">
              <Label htmlFor="name" className="text-sm text-gray-600 mb-2 block">
                이름 <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="명명이"
                className="bg-gray-50"
              />
            </div>

            {/* Gender & Age */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <Label htmlFor="gender" className="text-sm text-gray-600 mb-2 block">
                  성별 <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.gender}
                  onValueChange={(value) => handleChange("gender", value)}
                >
                  <SelectTrigger className="bg-gray-50">
                    <SelectValue placeholder="수컷" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="수컷">수컷</SelectItem>
                    <SelectItem value="암컷">암컷</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="age" className="text-sm text-gray-600 mb-2 block">
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
                  placeholder="3"
                  className="bg-gray-50"
                />
              </div>
            </div>

            {/* Size */}
            <div>
              <Label htmlFor="size" className="text-sm text-gray-600 mb-2 block">
                크기 <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.size}
                onValueChange={(value) => handleChange("size", value)}
              >
                <SelectTrigger className="bg-gray-50">
                  <SelectValue placeholder="중형견 (10~25kg)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="소형견">소형견 (0~10kg)</SelectItem>
                  <SelectItem value="중형견">중형견 (10~25kg)</SelectItem>
                  <SelectItem value="대형견">대형견 (25kg 이상)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Optional Info Section */}
          <div className="mb-8">
            <h3 className="mb-4 text-gray-700">선택 정보</h3>

            {/* Birthday */}
            <div className="mb-4">
              <Label htmlFor="birthday" className="text-sm text-gray-600 mb-2 block">
                생일
              </Label>
              <Input
                id="birthday"
                value={formData.birthday}
                onChange={(e) =>
                  handleChange("birthday", e.target.value.replace(/\D/g, ""))
                }
                placeholder="20210315"
                maxLength={8}
                className="bg-gray-50"
              />
            </div>

            {/* Weight */}
            <div className="mb-4">
              <Label htmlFor="weight" className="text-sm text-gray-600 mb-2 block">
                몸무게 (kg)
              </Label>
              <Input
                id="weight"
                type="number"
                step="0.1"
                min="0"
                value={formData.weight || ""}
                onChange={(e) =>
                  handleChange("weight", parseFloat(e.target.value) || undefined)
                }
                placeholder="15"
                className="bg-gray-50"
              />
            </div>

            {/* Personality */}
            <div>
              <Label htmlFor="personality" className="text-sm text-gray-600 mb-2 block">
                성격
              </Label>
              <Textarea
                id="personality"
                value={formData.personality}
                onChange={(e) => handleChange("personality", e.target.value)}
                placeholder="활발함"
                rows={3}
                className="bg-gray-50 resize-none"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              onClick={handleSave}
              className="flex-1 bg-gradient-to-r from-yellow-200 to-yellow-300 hover:from-yellow-300 hover:to-yellow-400 text-gray-900"
            >
              완료
            </Button>
            <Button onClick={onClose} variant="outline" className="flex-1">
              취소
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
