import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { Login } from "./components/Login";
import { Signup } from "./components/Signup";
import { FindAccount } from "./components/FindAccount";
import { MyPage } from "./components/MyPage";
import { PetForm } from "./components/PetForm";
import { WizardDialog } from "./components/WizardDialog";
import { FilterDialog, FilterState } from "./components/FilterDialog";
import { SearchPage } from "./components/SearchPage";
import { PlaceDetail } from "./components/PlaceDetail";
import { ThemeSection } from "./components/ThemeSection";
import { MapView } from "./components/MapView";
import { mockPlaces, mockReviews, mockUser, mockPets, mockMyReviews } from "./lib/mockData";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner@2.0.3";

type Page =
  | "main"
  | "login"
  | "signup"
  | "findId"
  | "findPassword"
  | "mypage"
  | "addPet"
  | "editPet"
  | "search"
  | "placeDetail";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("main");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showWizard, setShowWizard] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    amenities: [],
    petSizes: [],
    placeTypes: [],
  });
  const [highlightedPlaceId, setHighlightedPlaceId] = useState<number | null>(null);
  const [selectedPlaceId, setSelectedPlaceId] = useState<number | null>(null);
  const [editingPetId, setEditingPetId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data state
  const [user, setUser] = useState(mockUser);
  const [pets, setPets] = useState(mockPets);
  const [places] = useState(mockPlaces);
  const [reviews, setReviews] = useState(mockReviews);
  const [myReviews] = useState(mockMyReviews);

  // Auth handlers
  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentPage("main");
    toast.success("로그인되었습니다!");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage("splash");
    toast.success("로그아웃되었습니다!");
  };

  const handleSignup = () => {
    setIsLoggedIn(true);
    setCurrentPage("addPet");
    toast.success("회원가입이 완료되었습니다! 반려동물을 등록해주세요.");
  };

  const handleDeleteAccount = () => {
    setIsLoggedIn(false);
    setCurrentPage("splash");
    toast.success("계정이 삭제되었습니다.");
  };

  // Pet handlers
  const handleAddPet = (petData: any) => {
    const newPet = {
      ...petData,
      id: pets.length + 1,
      userId: user.id,
    };
    setPets([...pets, newPet]);
    setCurrentPage("mypage");
    toast.success("반려동물이 등록되었습니다!");
  };

  const handleEditPet = (petData: any) => {
    setPets(
      pets.map((pet) =>
        pet.id === editingPetId ? { ...pet, ...petData } : pet
      )
    );
    setEditingPetId(null);
    setCurrentPage("mypage");
    toast.success("반려동물 정보가 수정되었습니다!");
  };

  const handleDeletePet = (petId: number) => {
    setPets(pets.filter((pet) => pet.id !== petId));
    toast.success("반려동물 정보가 삭제되었습니다.");
  };

  // Profile handlers
  const handleUpdateProfile = (data: any) => {
    setUser({ ...user, ...data });
    toast.success("프로필이 수정되었습니다!");
  };

  // Review handlers
  const handleAddReview = (
    placeId: number,
    reviewData: { userName: string; userPhoto: string; rating: number; content: string; photos: string[] }
  ) => {
    const newReview = {
      ...reviewData,
      id: reviews.length + 1,
      placeId,
      userId: user.id,
      date: new Date().toISOString().split("T")[0],
    };
    setReviews([...reviews, newReview]);
    toast.success("리뷰가 작성되었습니다!");
  };

  const handleEditReview = (
    reviewId: number,
    reviewData: { userName: string; userPhoto: string; rating: number; content: string; photos: string[] }
  ) => {
    setReviews(
      reviews.map((review) =>
        review.id === reviewId
          ? {
              ...review,
              ...reviewData,
              date: new Date().toISOString().split("T")[0],
            }
          : review
      )
    );
    toast.success("리뷰가 수정되었습니다!");
  };

  const handleDeleteReview = (reviewId: number) => {
    setReviews(reviews.filter((review) => review.id !== reviewId));
    toast.success("리뷰가 삭제되었습니다!");
  };

  const handleEditMyPageReview = (reviewId: number, rating: number, content: string, photos?: string[]) => {
    setReviews(
      reviews.map((review) =>
        review.id === reviewId
          ? {
              ...review,
              rating,
              content,
              photos: photos || review.photos,
              date: new Date().toISOString().split("T")[0],
            }
          : review
      )
    );
    toast.success("리뷰가 수정되었습니다!");
  };

  // Navigation handlers
  const handlePlaceClick = (placeId: number) => {
    setSelectedPlaceId(placeId);
    setCurrentPage("placeDetail");
  };

  const handleSearchClick = () => {
    setSearchQuery("");
    setCurrentPage("search");
  };

  const handleLogoClick = () => {
    setCurrentPage("main");
  };

  const handleFilterApply = (newFilters: FilterState) => {
    setFilters(newFilters);
    toast.success("필터가 적용되었습니다!");
  };

  // Render current page
  const renderPage = () => {
    const selectedPlace = places.find((p) => p.id === selectedPlaceId);
    const editingPet = pets.find((p) => p.id === editingPetId);

    switch (currentPage) {
      case "login":
        return (
          <Login
            onLogin={handleLogin}
            onSignup={() => setCurrentPage("signup")}
            onFindAccount={(type) =>
              setCurrentPage(type === "id" ? "findId" : "findPassword")
            }
            onBack={() => setCurrentPage("main")}
          />
        );

      case "signup":
        return (
          <Signup
            onSignup={handleSignup}
            onBack={() => setCurrentPage("login")}
          />
        );

      case "findId":
        return (
          <FindAccount
            type="id"
            onBack={() => setCurrentPage("login")}
          />
        );

      case "findPassword":
        return (
          <FindAccount
            type="password"
            onBack={() => setCurrentPage("login")}
          />
        );

      case "mypage":
        return (
          <MyPage
            user={user}
            pets={pets}
            reviews={myReviews}
            onBack={() => setCurrentPage("main")}
            onAddPet={() => {
              setEditingPetId(null);
              setCurrentPage("addPet");
            }}
            onEditPet={(petId) => {
              setEditingPetId(petId);
              setCurrentPage("editPet");
            }}
            onDeletePet={handleDeletePet}
            onUpdateProfile={handleUpdateProfile}
            onDeleteAccount={handleDeleteAccount}
            onEditReview={handleEditMyPageReview}
            onDeleteReview={handleDeleteReview}
          />
        );

      case "addPet":
        return (
          <PetForm
            onSubmit={handleAddPet}
            onBack={() => setCurrentPage(isLoggedIn ? "mypage" : "main")}
          />
        );

      case "editPet":
        return (
          <PetForm
            pet={editingPet}
            onSubmit={handleEditPet}
            onBack={() => setCurrentPage("mypage")}
          />
        );

      case "search":
        return (
          <SearchPage
            places={places}
            initialQuery={searchQuery}
            onBack={() => setCurrentPage("main")}
            onPlaceClick={handlePlaceClick}
            onWizardClick={() => setShowWizard(true)}
            onFilterClick={() => setShowFilter(true)}
            isLoggedIn={isLoggedIn}
            onLoginClick={() => setCurrentPage("login")}
            onSignupClick={() => setCurrentPage("signup")}
            onLogoutClick={handleLogout}
            onMyPageClick={() => setCurrentPage("mypage")}
          />
        );

      case "placeDetail":
        if (!selectedPlace) {
          setCurrentPage("main");
          return null;
        }
        return (
          <PlaceDetail
            place={selectedPlace}
            reviews={reviews}
            isLoggedIn={isLoggedIn}
            currentUserId={user.id}
            currentUserName={user.nickname}
            onBack={() => setCurrentPage("search")}
            onAddReview={(reviewData) =>
              handleAddReview(selectedPlace.id, reviewData)
            }
            onEditReview={handleEditReview}
            onDeleteReview={handleDeleteReview}
          />
        );

      case "main":
      default:
        return (
          <div className="min-h-screen bg-white">
            <Header
              isLoggedIn={isLoggedIn}
              onLoginClick={() => setCurrentPage("login")}
              onSignupClick={() => setCurrentPage("signup")}
              onLogoutClick={handleLogout}
              onMyPageClick={() => setCurrentPage("mypage")}
              onLogoClick={handleLogoClick}
              onSearchClick={handleSearchClick}
              onWizardClick={() => setShowWizard(true)}
              onFilterClick={() => setShowFilter(true)}
            />

            <main className="max-w-[2520px] mx-auto px-6 lg:px-20 py-12">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left: Places */}
                <div className="lg:col-span-2 space-y-12">
                  {["카페", "야외", "물놀이", "음식점", "실내"].map(
                    (category) => (
                      <ThemeSection
                        key={category}
                        category={category}
                        places={places}
                        onPlaceClick={handlePlaceClick}
                        onPlaceHover={setHighlightedPlaceId}
                      />
                    )
                  )}
                </div>

                {/* Right: Map */}
                <div className="hidden lg:block lg:col-span-1">
                  <div className="sticky top-24">
                    <MapView
                      places={places}
                      highlightedPlaceId={highlightedPlaceId}
                      onPlaceClick={handlePlaceClick}
                    />
                  </div>
                </div>
              </div>
            </main>

            {/* Wizard Dialog */}
            <WizardDialog
              open={showWizard}
              onClose={() => setShowWizard(false)}
              places={places}
              onPlaceClick={handlePlaceClick}
            />

            {/* Filter Dialog */}
            <FilterDialog
              open={showFilter}
              onClose={() => setShowFilter(false)}
              onApply={handleFilterApply}
            />
          </div>
        );
    }
  };

  return (
    <>
      {renderPage()}
      <Toaster position="top-center" />
    </>
  );
}
