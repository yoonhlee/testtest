import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "./ui/dialog";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Trash2, Star, Upload, X as XIcon } from "lucide-react";

interface ReviewEditDialogProps {
  open: boolean;
  onClose: () => void;
  placeName: string;
  review: {
    rating: number;
    content: string;
    photos?: string[];
  };
  onSave: (rating: number, content: string, photos: string[]) => void;
  onDelete?: () => void;
  mode?: "write" | "edit";
}

export function ReviewEditDialog({
  open,
  onClose,
  placeName,
  review,
  onSave,
  onDelete,
  mode = "edit",
}: ReviewEditDialogProps) {
  const [rating, setRating] = useState(review.rating);
  const [content, setContent] = useState(review.content);
  const [photos, setPhotos] = useState<string[]>(review.photos || []);
  const [hoveredRating, setHoveredRating] = useState(0);

  // Reset form when dialog opens
  useEffect(() => {
    if (open) {
      setRating(review.rating);
      setContent(review.content);
      setPhotos(review.photos || []);
    }
  }, [open, review]);

  const handleSave = () => {
    onSave(rating, content, photos);
    onClose();
  };

  const handleDelete = () => {
    onDelete?.();
    onClose();
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    // Convert files to data URLs for preview
    const filePromises = Array.from(files).map((file) => {
      return new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result as string);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(filePromises).then((newPhotos) => {
      setPhotos([...photos, ...newPhotos].slice(0, 5)); // Max 5 photos
    });
  };

  const removePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[500px] p-0">
        {/* Header */}
        <div className="border-b border-gray-200 px-6 py-4">
          <h2 className="text-lg">{mode === "write" ? "리뷰 작성" : "리뷰 수정"}</h2>
          <p className="text-sm text-gray-600 mt-1">{placeName}</p>
        </div>

        <div className="px-6 py-6">
          {/* Rating Section */}
          <div className="mb-6">
            <h3 className="mb-3 text-gray-900">별점</h3>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-10 h-10 ${
                      star <= (hoveredRating || rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "fill-gray-200 text-gray-200"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Review Content Section */}
          <div className="mb-6">
            <h3 className="mb-3 text-gray-900">리뷰 내용</h3>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="우리 강아지가 정말 좋아했어요! 직원분들도 친절하시고 시설도 깨끗합니다."
              rows={4}
              className="resize-none bg-gray-50"
            />
          </div>

          {/* Photo Upload Section */}
          <div className="mb-6">
            <h3 className="mb-3 text-gray-900">사진 추가 (최대 5장)</h3>
            <div className="grid grid-cols-5 gap-2">
              {photos.map((photo, index) => (
                <div key={index} className="relative aspect-square">
                  <img
                    src={photo}
                    alt={`리뷰 사진 ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <button
                    onClick={() => removePhoto(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                  >
                    <XIcon className="w-3 h-3" />
                  </button>
                </div>
              ))}
              {photos.length < 5 && (
                <label className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-yellow-300 hover:bg-yellow-50 transition-colors">
                  <Upload className="w-6 h-6 text-gray-400" />
                  <span className="text-xs text-gray-500 mt-1">추가</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1 border-gray-300"
            >
              취소
            </Button>
            {mode === "edit" && onDelete && (
              <Button
                onClick={handleDelete}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white"
              >
                <Trash2 className="w-4 h-4 mr-1" />
                삭제
              </Button>
            )}
            <Button
              onClick={handleSave}
              className="flex-1 bg-gradient-to-r from-yellow-200 to-yellow-300 hover:from-yellow-300 hover:to-yellow-400 text-gray-900"
            >
              {mode === "write" ? "작성" : "저장"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
