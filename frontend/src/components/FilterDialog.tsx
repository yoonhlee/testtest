import { useState } from "react";
import { Dialog, DialogContent } from "./ui/dialog";
import { Button } from "./ui/button";
import { X, Car, Wifi, Coffee, UtensilsCrossed, Trees, Waves, Dumbbell, Scissors } from "lucide-react";

interface FilterDialogProps {
  open: boolean;
  onClose: () => void;
  onApply: (filters: FilterState) => void;
}

export interface FilterState {
  amenities: string[];
  petSizes: string[];
  placeTypes: string[];
}

export function FilterDialog({ open, onClose, onApply }: FilterDialogProps) {
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [selectedPetSizes, setSelectedPetSizes] = useState<string[]>([]);
  const [selectedPlaceTypes, setSelectedPlaceTypes] = useState<string[]>([]);

  const amenities = [
    { id: "parking", label: "주차 공간", icon: Car },
    { id: "wifi", label: "Wi-Fi", icon: Wifi },
    { id: "cafe", label: "카페", icon: Coffee },
    { id: "restaurant", label: "음식점", icon: UtensilsCrossed },
    { id: "outdoor", label: "야외 공간", icon: Trees },
    { id: "water", label: "물놀이", icon: Waves },
    { id: "exercise", label: "운동 시설", icon: Dumbbell },
    { id: "grooming", label: "미용 서비스", icon: Scissors },
  ];

  const petSizes = [
    { id: "small", label: "소형견", description: "10kg 이하" },
    { id: "medium", label: "중형견", description: "10~25kg" },
    { id: "large", label: "대형견", description: "25kg 이상" },
  ];

  const placeTypes = [
    { id: "park", label: "공원" },
    { id: "cafe", label: "카페" },
    { id: "restaurant", label: "음식점" },
    { id: "accommodation", label: "숙박" },
    { id: "grooming", label: "미용" },
    { id: "hospital", label: "병원" },
  ];

  const toggleAmenity = (id: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const togglePetSize = (id: string) => {
    setSelectedPetSizes((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const togglePlaceType = (id: string) => {
    setSelectedPlaceTypes((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleApply = () => {
    onApply({
      amenities: selectedAmenities,
      petSizes: selectedPetSizes,
      placeTypes: selectedPlaceTypes,
    });
    onClose();
  };

  const handleReset = () => {
    setSelectedAmenities([]);
    setSelectedPetSizes([]);
    setSelectedPlaceTypes([]);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[500px] max-h-[90vh] overflow-y-auto p-0">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 z-10">
          <div className="flex items-center justify-between">
            <h2 className="text-lg">필터</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            원하는 조건으로 장소를 필터링해보세요.
          </p>
        </div>

        <div className="px-6 py-6">
          {/* Recommended Filters Section */}
          <div className="mb-8">
            <h3 className="mb-4 text-gray-900">추천 필터</h3>
            <div className="grid grid-cols-4 gap-3">
              {amenities.map((amenity) => {
                const Icon = amenity.icon;
                const isSelected = selectedAmenities.includes(amenity.id);
                return (
                  <button
                    key={amenity.id}
                    onClick={() => toggleAmenity(amenity.id)}
                    className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border transition-all ${
                      isSelected
                        ? "border-yellow-300 bg-yellow-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <Icon className={`w-6 h-6 ${isSelected ? "text-yellow-600" : "text-gray-700"}`} />
                    <span className={`text-xs text-center ${isSelected ? "text-yellow-600" : "text-gray-700"}`}>
                      {amenity.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Pet Size Section */}
          <div className="mb-8">
            <h3 className="mb-4 text-gray-900">반려동물 크기</h3>
            <div className="grid grid-cols-3 gap-3">
              {petSizes.map((size) => {
                const isSelected = selectedPetSizes.includes(size.id);
                return (
                  <button
                    key={size.id}
                    onClick={() => togglePetSize(size.id)}
                    className={`flex flex-col items-start p-4 rounded-xl border transition-all ${
                      isSelected
                        ? "border-yellow-300 bg-yellow-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <span className={`mb-1 ${isSelected ? "text-yellow-600" : "text-gray-900"}`}>
                      {size.label}
                    </span>
                    <span className={`text-xs ${isSelected ? "text-yellow-600" : "text-gray-500"}`}>
                      {size.description}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Place Type Section */}
          <div className="mb-6">
            <h3 className="mb-4 text-gray-900">장소 유형</h3>
            <div className="flex flex-wrap gap-2">
              {placeTypes.map((type) => {
                const isSelected = selectedPlaceTypes.includes(type.id);
                return (
                  <button
                    key={type.id}
                    onClick={() => togglePlaceType(type.id)}
                    className={`px-5 py-2.5 rounded-full border transition-all ${
                      isSelected
                        ? "border-yellow-300 bg-yellow-50 text-yellow-600"
                        : "border-gray-200 text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    {type.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-gray-100">
            <Button
              onClick={handleReset}
              variant="outline"
              className="flex-1"
            >
              초기화
            </Button>
            <Button
              onClick={handleApply}
              className="flex-1 bg-gradient-to-r from-yellow-200 to-yellow-300 hover:from-yellow-300 hover:to-yellow-400 text-gray-900"
            >
              적용하기
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
