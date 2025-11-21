import { useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Star } from "lucide-react";

interface ReviewFormProps {
  initialData?: {
    rating: number;
    content: string;
    photos: string[];
  };
  onSubmit: (data: { rating: number; content: string; photos: string[] }) => void;
  onCancel: () => void;
}

export function ReviewForm({ initialData, onSubmit, onCancel }: ReviewFormProps) {
  const [rating, setRating] = useState(initialData?.rating || 0);
  const [content, setContent] = useState(initialData?.content || "");
  const [hoverRating, setHoverRating] = useState(0);
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (rating === 0) {
      setError("별점을 선택해주세요.");
      return;
    }

    onSubmit({
      rating,
      content,
      photos: [], // Photos not implemented in this version
    });
  };

  return (
    <div className="bg-gray-50 rounded-2xl p-6">
      <h3 className="text-lg text-gray-900 mb-4">
        {initialData ? "리뷰 수정" : "리뷰 작성"}
      </h3>

      {/* Rating */}
      <div className="mb-4">
        <label className="block text-sm text-gray-700 mb-2">
          별점 <span className="text-red-500">*</span>
        </label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="transition-transform hover:scale-110"
            >
              <Star
                className={`w-8 h-8 ${
                  star <= (hoverRating || rating)
                    ? "text-yellow-500 fill-yellow-500"
                    : "text-gray-300"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="mb-4">
        <label className="block text-sm text-gray-700 mb-2">
          리뷰 내용 (선택, 최대 500자)
        </label>
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="방문 경험을 공유해주세요..."
          maxLength={500}
          rows={5}
          className="resize-none"
        />
        <p className="text-xs text-gray-500 mt-1 text-right">
          {content.length} / 500
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
          {error}
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3">
        <Button onClick={onCancel} variant="outline" className="flex-1">
          취소
        </Button>
        <Button
          onClick={handleSubmit}
          className="flex-1 bg-yellow-200 hover:bg-yellow-300 text-gray-900"
        >
          {initialData ? "수정 완료" : "등록하기"}
        </Button>
      </div>
    </div>
  );
}
