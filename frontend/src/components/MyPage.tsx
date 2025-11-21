import { useState } from "react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import {
  User,
  Dog,
  Settings,
  MessageSquare,
  Edit2,
  Users,
  Heart,
} from "lucide-react";
import logoImage from "figma:asset/13429f3bf73f16f4f94cb74ce47b8a5ef9aa39a9.png";
import { ProfileEditDialog } from "./ProfileEditDialog";
import { AccountManagement } from "./AccountManagement";
import { PetDetail } from "./PetDetail";
import { PetEditDialog } from "./PetEditDialog";
import { ReviewEditDialog } from "./ReviewEditDialog";

interface Pet {
  id: number;
  name: string;
  breed: string;
  age: number;
  size: string;
}

interface Review {
  id: number;
  placeId: number;
  placeName: string;
  rating: number;
  content: string;
  date: string;
}

interface MyPageProps {
  user: {
    name: string;
    nickname: string;
    email: string;
    phone: string;
    birthdate: string;
    address: string;
    profilePhoto?: string;
  };
  pets: Pet[];
  reviews: Review[];
  onBack: () => void;
  onAddPet: () => void;
  onEditPet: (petId: number) => void;
  onDeletePet: (petId: number) => void;
  onUpdateProfile: (data: any) => void;
  onDeleteAccount: () => void;
  onEditReview?: (reviewId: number, rating: number, content: string, photos?: string[]) => void;
  onDeleteReview?: (reviewId: number) => void;
}

export function MyPage({
  user,
  pets,
  reviews,
  onBack,
  onAddPet,
  onEditPet,
  onUpdateProfile,
  onDeleteAccount,
  onDeletePet,
  onEditReview,
  onDeleteReview,
}: MyPageProps) {
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [showProfileEdit, setShowProfileEdit] = useState(false);
  const [showAccountManagement, setShowAccountManagement] = useState(false);
  const [selectedPetId, setSelectedPetId] = useState<number | null>(null);
  const [showPetEdit, setShowPetEdit] = useState(false);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [showReviewEdit, setShowReviewEdit] = useState(false);

  // Get first character of name for profile initial
  const profileInitial = user.name ? user.name.charAt(0) : "사";

  const handleSaveNickname = (nickname: string) => {
    onUpdateProfile({ nickname });
  };

  const handleUpdateField = (field: string, value: string) => {
    onUpdateProfile({ [field]: value });
  };

  const handlePetClick = (petId: number) => {
    setSelectedPetId(petId);
  };

  const handlePetEdit = () => {
    setShowPetEdit(true);
  };

  const handlePetDelete = () => {
    if (selectedPetId) {
      onDeletePet(selectedPetId);
      setSelectedPetId(null);
    }
  };

  const handleReviewEdit = (review: Review) => {
    setEditingReview(review);
    setShowReviewEdit(true);
  };

  const handleSaveReview = (rating: number, content: string, photos: string[]) => {
    if (editingReview && onEditReview) {
      onEditReview(editingReview.id, rating, content, photos);
      setEditingReview(null);
    }
  };

  const handleDeleteReview = () => {
    if (editingReview && onDeleteReview) {
      onDeleteReview(editingReview.id);
      setEditingReview(null);
      setShowReviewEdit(false);
    }
  };

  const handleSavePet = (petData: any) => {
    if (selectedPetId) {
      onEditPet(selectedPetId);
    }
    setShowPetEdit(false);
  };

  // Get selected pet
  const selectedPet = selectedPetId
    ? pets.find((p) => p.id === selectedPetId)
    : null;

  // If showing pet detail, render that instead
  if (selectedPet) {
    return (
      <>
        <PetDetail
          pet={selectedPet}
          onBack={() => setSelectedPetId(null)}
          onEdit={handlePetEdit}
          onDelete={handlePetDelete}
        />
        <PetEditDialog
          open={showPetEdit}
          onClose={() => setShowPetEdit(false)}
          pet={selectedPet}
          onSave={handleSavePet}
        />
      </>
    );
  }

  // If showing account management, render that instead
  if (showAccountManagement) {
    return (
      <AccountManagement
        user={user}
        onBack={() => setShowAccountManagement(false)}
        onUpdateField={handleUpdateField}
        onDeleteAccount={onDeleteAccount}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10 shadow-sm">
        <div className="max-w-[2520px] mx-auto px-6 lg:px-20 h-20 flex items-center">
          <button
            onClick={onBack}
            className="hover:opacity-70 transition-opacity"
          >
            <img src={logoImage} alt="어디가개" className="h-20" />
          </button>
        </div>
      </div>

      <div className="max-w-[2520px] mx-auto px-6 lg:px-20 py-12">
        {/* Top Section: User Profile and Pet Profiles */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* User Profile */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8">
            <h2 className="flex items-center gap-2 mb-6 text-gray-700">
              <User className="w-5 h-5" />
              사용자 프로필
            </h2>

            <div className="flex flex-col items-center mb-6">
              {/* Profile Circle */}
              <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                <span className="text-4xl text-gray-600">{profileInitial}</span>
              </div>

              {/* Nickname */}
              <h3 className="text-2xl text-gray-900 mb-1">{user.nickname}</h3>

              {/* Name */}
              <p className="text-gray-600 mb-2">{user.name}</p>

              {/* Pet Count */}
              <p className="text-yellow-600 mb-4">
                반려동물 {pets.length}마리
              </p>

              {/* Buttons */}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex items-center gap-2"
                  size="sm"
                  onClick={() => setShowProfileEdit(true)}
                >
                  <Edit2 className="w-4 h-4" />
                  수정
                </Button>
                <Button
                  variant="outline"
                  className="flex items-center gap-2"
                  size="sm"
                  onClick={() => setShowAccountManagement(true)}
                >
                  <Settings className="w-4 h-4" />
                  계정 관리
                </Button>
              </div>
            </div>
          </div>

          {/* Pet Profiles */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8">
            <h2 className="flex items-center gap-2 mb-6 text-gray-700">
              <Dog className="w-5 h-5" />
              반려동물 프로필
            </h2>

            {/* Pet Cards */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {pets.slice(0, 2).map((pet) => (
                <div
                  key={pet.id}
                  className="border border-gray-200 rounded-xl p-4 relative cursor-pointer hover:border-yellow-300 transition-colors"
                  onClick={() => handlePetClick(pet.id)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                      <Dog className="w-6 h-6 text-gray-500" />
                    </div>
                    <button
                      className="text-gray-400 hover:text-gray-600"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPetId(pet.id);
                        setShowPetEdit(true);
                      }}
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                  </div>

                  <h3 className="mb-1">{pet.name}</h3>
                  <p className="text-sm text-gray-600 mb-1">{pet.breed}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span>{pet.age}살</span>
                    <span>·</span>
                    <span>{pet.size}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Pet Button */}
            <Button
              onClick={onAddPet}
              variant="outline"
              className="w-full border-gray-300 hover:bg-gray-50"
            >
              반려동물 추가하기
            </Button>
          </div>
        </div>

        {/* Recent Reviews Section */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8">
          <div className="flex items-center gap-3 mb-6">
            <Checkbox id="recent-reviews" />
            <label
              htmlFor="recent-reviews"
              className="text-gray-700 cursor-pointer"
            >
              최근 작성한 리뷰
            </label>
          </div>

          {/* Reviews List */}
          <div className="space-y-4">
            {reviews.slice(0, showAllReviews ? reviews.length : 2).map((review) => (
              <div
                key={review.id}
                className="border-b border-gray-100 pb-4 last:border-0"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-gray-900">{review.placeName}</h3>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={
                              i < review.rating
                                ? "text-yellow-400"
                                : "text-gray-200"
                            }
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">
                      {review.content}
                    </p>
                    <p className="text-xs text-gray-400">{review.date}</p>
                  </div>
                  <button 
                    className="text-gray-400 hover:text-gray-600 ml-4"
                    onClick={() => handleReviewEdit(review)}
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Profile Edit Dialog */}
      <ProfileEditDialog
        open={showProfileEdit}
        onClose={() => setShowProfileEdit(false)}
        currentNickname={user.nickname}
        profileInitial={profileInitial}
        onSave={handleSaveNickname}
      />

      {/* Review Edit Dialog */}
      {editingReview && (
        <ReviewEditDialog
          open={showReviewEdit}
          onClose={() => {
            setShowReviewEdit(false);
            setEditingReview(null);
          }}
          placeName={editingReview.placeName}
          review={{
            rating: editingReview.rating,
            content: editingReview.content,
            photos: editingReview.photos,
          }}
          onSave={handleSaveReview}
          onDelete={handleDeleteReview}
        />
      )}
    </div>
  );
}
