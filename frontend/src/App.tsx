import { useState } from "react";
import { Routes, Route, useNavigate, useParams, useLocation } from "react-router-dom";
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
import { toast } from "sonner";

export default function App() {
  const navigate = useNavigate();
  const location = useLocation(); // 현재 경로 확인용
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showWizard, setShowWizard] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    amenities: [],
    petSizes: [],
    placeTypes: [],
  });
  const [highlightedPlaceId, setHighlightedPlaceId] = useState<number | null>(null);
  const [editingPetId, setEditingPetId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data state
  const [user, setUser] = useState(mockUser);
  const [pets, setPets] = useState(mockPets);
  const [places] = useState(mockPlaces);
  const [reviews, setReviews] = useState(mockReviews);
  const [myReviews] = useState(mockMyReviews);

  // --- Handlers (Navigation logic updated to use navigate) ---

  const handleLogin = () => {
    setIsLoggedIn(true);
    navigate("/"); // 메인으로 이동
    toast.success("로그인되었습니다!");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/");
    toast.success("로그아웃되었습니다!");
  };

  const handleSignup = () => {
    setIsLoggedIn(true);
    navigate("/add-pet"); // 회원가입 후 펫 등록 페이지로
    toast.success("회원가입이 완료되었습니다! 반려동물을 등록해주세요.");
  };

  const handleDeleteAccount = () => {
    setIsLoggedIn(false);
    navigate("/");
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
    navigate("/mypage");
    toast.success("반려동물이 등록되었습니다!");
  };

  const handleEditPet = (petData: any) => {
    setPets(
      pets.map((pet) =>
        pet.id === editingPetId ? { ...pet, ...petData } : pet
      )
    );
    setEditingPetId(null);
    navigate("/mypage");
    toast.success("반려동물 정보가 수정되었습니다!");
  };

  const handleDeletePet = (petId: number) => {
    setPets(pets.filter((pet) => pet.id !== petId));
    toast.success("반려동물 정보가 삭제되었습니다.");
  };

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
          ? { ...review, ...reviewData, date: new Date().toISOString().split("T")[0] }
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
    // 마이페이지 리뷰 수정 로직 (단순화)
    toast.success("리뷰가 수정되었습니다! (Mock)");
  };

  // Navigation helpers
  const handlePlaceClick = (placeId: number) => {
    navigate(`/place/${placeId}`);
  };

  const handleSearchClick = () => {
    setSearchQuery("");
    navigate("/search");
  };

  const handleFilterApply = (newFilters: FilterState) => {
    setFilters(newFilters);
    toast.success("필터가 적용되었습니다!");
  };

  // --- Helper Component for Place Detail Routing ---
  const PlaceDetailWrapper = () => {
    const { id } = useParams(); // URL에서 ID 추출
    const place = places.find((p) => p.id === Number(id));

    if (!place) {
      return <div>존재하지 않는 장소입니다.</div>;
    }

    return (
      <PlaceDetail
        place={place}
        reviews={reviews}
        isLoggedIn={isLoggedIn}
        currentUserId={user.id}
        currentUserName={user.nickname}
        onBack={() => navigate(-1)} // 뒤로가기
        onAddReview={(reviewData) => handleAddReview(place.id, reviewData)}
        onEditReview={handleEditReview}
        onDeleteReview={handleDeleteReview}
      />
    );
  };

  const editingPet = pets.find((p) => p.id === editingPetId);

  return (
    <>
      <Routes>
        {/* Main Page */}
        <Route
          path="/"
          element={
            <div className="min-h-screen bg-white">
              <Header
                isLoggedIn={isLoggedIn}
                onLoginClick={() => navigate("/login")}
                onSignupClick={() => navigate("/signup")}
                onLogoutClick={handleLogout}
                onMyPageClick={() => navigate("/mypage")}
                onLogoClick={() => navigate("/")}
                onSearchClick={handleSearchClick}
                onWizardClick={() => setShowWizard(true)}
                onFilterClick={() => setShowFilter(true)}
              />

              <main className="max-w-[2520px] mx-auto px-6 lg:px-20 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 space-y-12">
                    {["카페", "야외", "물놀이", "음식점", "실내"].map((category) => (
                      <ThemeSection
                        key={category}
                        category={category}
                        places={places}
                        onPlaceClick={handlePlaceClick}
                        onPlaceHover={setHighlightedPlaceId}
                      />
                    ))}
                  </div>
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
            </div>
          }
        />

        {/* Auth Pages */}
        <Route
          path="/login"
          element={
            <Login
              onLogin={handleLogin}
              onSignup={() => navigate("/signup")}
              onFindAccount={(type) => navigate(type === "id" ? "/find-id" : "/find-password")}
              onBack={() => navigate("/")}
            />
          }
        />
        <Route
          path="/signup"
          element={<Signup onSignup={handleSignup} onBack={() => navigate("/login")} />}
        />
        <Route
          path="/find-id"
          element={<FindAccount type="id" onBack={() => navigate("/login")} />}
        />
        <Route
          path="/find-password"
          element={<FindAccount type="password" onBack={() => navigate("/login")} />}
        />

        {/* My Page & Pet */}
        <Route
          path="/mypage"
          element={
            <MyPage
              user={user}
              pets={pets}
              reviews={myReviews}
              onBack={() => navigate("/")}
              onAddPet={() => {
                setEditingPetId(null);
                navigate("/add-pet");
              }}
              onEditPet={(petId) => {
                setEditingPetId(petId);
                navigate("/edit-pet");
              }}
              onDeletePet={handleDeletePet}
              onUpdateProfile={handleUpdateProfile}
              onDeleteAccount={handleDeleteAccount}
              onEditReview={handleEditMyPageReview}
              onDeleteReview={handleDeleteReview}
            />
          }
        />
        <Route
          path="/add-pet"
          element={
            <PetForm
              onSubmit={handleAddPet}
              onBack={() => navigate(isLoggedIn ? "/mypage" : "/")}
            />
          }
        />
        <Route
          path="/edit-pet"
          element={
            <PetForm
              pet={editingPet}
              onSubmit={handleEditPet}
              onBack={() => navigate("/mypage")}
            />
          }
        />

        {/* Search & Detail */}
        <Route
          path="/search"
          element={
            <SearchPage
              places={places}
              initialQuery={searchQuery}
              onBack={() => navigate("/")}
              onPlaceClick={handlePlaceClick}
              onWizardClick={() => setShowWizard(true)}
              onFilterClick={() => setShowFilter(true)}
              isLoggedIn={isLoggedIn}
              onLoginClick={() => navigate("/login")}
              onSignupClick={() => navigate("/signup")}
              onLogoutClick={handleLogout}
              onMyPageClick={() => navigate("/mypage")}
            />
          }
        />
        <Route path="/place/:id" element={<PlaceDetailWrapper />} />
      </Routes>

      {/* Global Dialogs */}
      <WizardDialog
        open={showWizard}
        onClose={() => setShowWizard(false)}
        places={places}
        onPlaceClick={handlePlaceClick}
      />
      <FilterDialog
        open={showFilter}
        onClose={() => setShowFilter(false)}
        onApply={handleFilterApply}
      />
      <Toaster position="top-center" />
    </>
  );
}