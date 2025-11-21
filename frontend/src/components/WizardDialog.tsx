import { useState } from "react";
import { Sparkles, X } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { PlaceCard } from "./PlaceCard";

interface Place {
  id: number;
  name: string;
  image: string;
  description: string;
  rating: number;
  reviewCount: number;
  category: string;
  address: string;
  details: string;
}

interface WizardDialogProps {
  open: boolean;
  onClose: () => void;
  places: Place[];
  onPlaceClick: (placeId: number) => void;
}

const questions = [
  {
    id: 1,
    question: "댕댕이의 크기는 어떤가요?",
    options: ["소형견", "중형견", "대형견"],
  },
  {
    id: 2,
    question: "오늘 댕댕이의 컨디션은 어떤가요?",
    options: ["활발함", "조용함"],
  },
  {
    id: 3,
    question: "어디까지 이동하실 예정인가요?",
    options: ["근처", "근교", "멀리"],
  },
  {
    id: 4,
    question: "어떤 종류의 장소를 선호하시나요?",
    options: ["자연친화적", "도시적", "프라이빗"],
  },
];

export function WizardDialog({ open, onClose, places, onPlaceClick }: WizardDialogProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [sortBy, setSortBy] = useState<"distance" | "rating" | "popularity">("distance");

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Show results
      setShowResults(true);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers([]);
    setShowResults(false);
  };

  const handleClose = () => {
    handleReset();
    onClose();
  };

  // Mock recommendation logic
  const getRecommendedPlaces = () => {
    // Simple mock: return first 3 places
    let recommended = [...places].slice(0, 3);

    // Sort based on selection
    if (sortBy === "rating") {
      recommended.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "popularity") {
      recommended.sort((a, b) => b.reviewCount - a.reviewCount);
    }

    return recommended;
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Sparkles className="w-6 h-6 text-yellow-400" />
            마법사 추천
          </DialogTitle>
        </DialogHeader>

        {!showResults ? (
          <div className="py-6">
            {/* Progress */}
            <div className="mb-8">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600">
                  질문 {currentStep + 1} / {questions.length}
                </span>
                <span className="text-sm text-gray-600">
                  {Math.round(((currentStep + 1) / questions.length) * 100)}%
                </span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-yellow-300 transition-all duration-300"
                  style={{
                    width: `${((currentStep + 1) / questions.length) * 100}%`,
                  }}
                />
              </div>
            </div>

            {/* Question */}
            <div className="text-center mb-8">
              <h3 className="text-2xl text-gray-900 mb-2">
                {questions[currentStep].question}
              </h3>
              <p className="text-gray-600">
                댕댕이에게 딱 맞는 장소를 찾아드릴게요!
              </p>
            </div>

            {/* Options */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {questions[currentStep].options.map((option) => (
                <button
                  key={option}
                  onClick={() => handleAnswer(option)}
                  className="p-6 bg-white border-2 border-gray-200 rounded-2xl hover:border-gray-900 hover:bg-gray-50 transition-all"
                >
                  <span className="text-lg text-gray-900">{option}</span>
                </button>
              ))}
            </div>

            {/* Previous answers */}
            {answers.length > 0 && (
              <div className="mt-8 pt-6 border-t">
                <p className="text-sm text-gray-600 mb-2">선택한 답변:</p>
                <div className="flex flex-wrap gap-2">
                  {answers.map((answer, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm"
                    >
                      {answer}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="py-6">
            {/* Results Header */}
            <div className="mb-6">
              <h3 className="text-xl text-gray-900 mb-4">
                🎉 댕댕이에게 딱 맞는 장소를 찾았어요!
              </h3>

              {/* Sort Options */}
              <div className="flex gap-2">
                <button
                  onClick={() => setSortBy("distance")}
                  className={`px-4 py-2 rounded-full text-sm transition-colors ${
                    sortBy === "distance"
                      ? "bg-yellow-200 text-gray-900"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  거리순
                </button>
                <button
                  onClick={() => setSortBy("rating")}
                  className={`px-4 py-2 rounded-full text-sm transition-colors ${
                    sortBy === "rating"
                      ? "bg-yellow-200 text-gray-900"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  평점순
                </button>
                <button
                  onClick={() => setSortBy("popularity")}
                  className={`px-4 py-2 rounded-full text-sm transition-colors ${
                    sortBy === "popularity"
                      ? "bg-yellow-200 text-gray-900"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  인기순
                </button>
              </div>
            </div>

            {/* Results */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {getRecommendedPlaces().map((place) => (
                <PlaceCard
                  key={place.id}
                  {...place}
                  onClick={() => {
                    onPlaceClick(place.id);
                    handleClose();
                  }}
                />
              ))}
            </div>

            {getRecommendedPlaces().length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600 mb-4">
                  아쉽지만 맞는 장소를 찾지 못했어요
                </p>
                <Button
                  onClick={handleReset}
                  variant="outline"
                  className="border-yellow-300 text-yellow-600"
                >
                  다시 시도하기
                </Button>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3">
              <Button onClick={handleReset} variant="outline" className="flex-1">
                다시 시작
              </Button>
              <Button
                onClick={handleClose}
                className="flex-1 bg-yellow-200 hover:bg-yellow-300 text-gray-900"
              >
                종료하기
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
