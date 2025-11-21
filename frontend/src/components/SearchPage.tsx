import { useState } from "react";
import { ThemeSection } from "./ThemeSection";
import { PlaceCard } from "./PlaceCard";
import { MapView } from "./MapView";
import { Header } from "./Header";
import { FilterDialog, FilterState } from "./FilterDialog";

interface Place {
  id: number;
  name: string;
  image: string;
  description: string;
  rating: number;
  reviewCount: number;
  category: string;
  lat: number;
  lng: number;
  parking: boolean;
  leadOff: boolean;
  maxDogs: number;
  allowedSizes: string[];
}

interface SearchPageProps {
  places: Place[];
  onBack: () => void;
  onPlaceClick: (placeId: number) => void;
  initialQuery?: string;
  onWizardClick?: () => void;
  onFilterClick?: () => void;
  isLoggedIn: boolean;
  onLoginClick: () => void;
  onSignupClick: () => void;
  onLogoutClick: () => void;
  onMyPageClick: () => void;
}

export function SearchPage({
  places,
  onBack,
  onPlaceClick,
  initialQuery = "",
  onWizardClick,
  onFilterClick,
  isLoggedIn,
  onLoginClick,
  onSignupClick,
  onLogoutClick,
  onMyPageClick,
}: SearchPageProps) {
  const [inputQuery, setInputQuery] = useState(initialQuery);
  const [appliedQuery, setAppliedQuery] = useState(initialQuery);
  const [highlightedPlaceId, setHighlightedPlaceId] = useState<number | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState<FilterState>({
    amenities: [],
    petSizes: [],
    placeTypes: [],
  });

  const handleSearch = () => {
    setAppliedQuery(inputQuery);
  };

  const handleFilterApply = (filters: FilterState) => {
    setActiveFilters(filters);
  };

  // Apply filters
  let filteredPlaces = places;

  if (appliedQuery) {
    filteredPlaces = filteredPlaces.filter(
      (place) =>
        place.name.includes(appliedQuery) ||
        place.address?.includes(appliedQuery) ||
        place.category.includes(appliedQuery)
    );
  }

  // Map FilterDialog filters to place filters
  const sizeMapping: Record<string, string> = {
    small: "소형견",
    medium: "중형견",
    large: "대형견",
  };

  const categoryMapping: Record<string, string> = {
    park: "공원",
    cafe: "카페",
    restaurant: "음식점",
    accommodation: "숙박",
    grooming: "미용",
    hospital: "병원",
  };

  if (activeFilters.petSizes.length > 0) {
    const mappedSizes = activeFilters.petSizes.map(id => sizeMapping[id]).filter(Boolean);
    if (mappedSizes.length > 0) {
      filteredPlaces = filteredPlaces.filter((place) =>
        mappedSizes.some((size) => place.allowedSizes.includes(size))
      );
    }
  }

  if (activeFilters.placeTypes.length > 0) {
    const mappedCategories = activeFilters.placeTypes.map(id => categoryMapping[id]).filter(Boolean);
    if (mappedCategories.length > 0) {
      filteredPlaces = filteredPlaces.filter((place) =>
        mappedCategories.includes(place.category)
      );
    }
  }

  if (activeFilters.amenities.includes("parking")) {
    filteredPlaces = filteredPlaces.filter((place) => place.parking);
  }

  const categories = Array.from(new Set(places.map((p) => p.category)));
  const hasActiveFilters =
    activeFilters.amenities.length > 0 ||
    activeFilters.petSizes.length > 0 ||
    activeFilters.placeTypes.length > 0;

  return (
    <div className="min-h-screen bg-white">
      {/* Header - Same as main page */}
      <Header
        isLoggedIn={isLoggedIn}
        onLoginClick={onLoginClick}
        onSignupClick={onSignupClick}
        onLogoutClick={onLogoutClick}
        onMyPageClick={onMyPageClick}
        onLogoClick={onBack}
        onSearchClick={() => {}}
        onWizardClick={onWizardClick}
        onFilterClick={() => setShowFilters(true)}
        showSearch={true}
        searchMode={true}
        searchQuery={inputQuery}
        onSearchChange={setInputQuery}
        onSearch={handleSearch}
      />

      {/* Filter Dialog */}
      <FilterDialog
        open={showFilters}
        onClose={() => setShowFilters(false)}
        onApply={handleFilterApply}
      />

      {/* Content */}
      <div className="max-w-[2520px] mx-auto px-6 lg:px-20 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Places */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl">
                  검색 결과 {filteredPlaces.length}개
                </h2>
              </div>
              {appliedQuery && (
                <p className="text-gray-600 mb-4">
                  "{appliedQuery}" 검색 결과입니다
                </p>
              )}
              {hasActiveFilters && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {activeFilters.petSizes.map((sizeId) => (
                    <span
                      key={sizeId}
                      className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm"
                    >
                      {sizeMapping[sizeId]}
                    </span>
                  ))}
                  {activeFilters.placeTypes.map((typeId) => (
                    <span
                      key={typeId}
                      className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm"
                    >
                      {categoryMapping[typeId]}
                    </span>
                  ))}
                  {activeFilters.amenities.includes("parking") && (
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">
                      주차 공간
                    </span>
                  )}
                  {activeFilters.amenities.includes("wifi") && (
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">
                      Wi-Fi
                    </span>
                  )}
                  {activeFilters.amenities.includes("cafe") && (
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">
                      카페
                    </span>
                  )}
                  {activeFilters.amenities.includes("restaurant") && (
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">
                      음식점
                    </span>
                  )}
                  {activeFilters.amenities.includes("outdoor") && (
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">
                      야외 공간
                    </span>
                  )}
                  {activeFilters.amenities.includes("water") && (
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">
                      물놀이
                    </span>
                  )}
                  {activeFilters.amenities.includes("exercise") && (
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">
                      운동 시설
                    </span>
                  )}
                  {activeFilters.amenities.includes("grooming") && (
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">
                      미용 서비스
                    </span>
                  )}
                </div>
              )}
            </div>

            {filteredPlaces.length === 0 ? (
              <div className="text-center py-24">
                <p className="text-gray-600 text-lg">검색 결과가 없습니다</p>
              </div>
            ) : hasActiveFilters ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredPlaces.map((place) => (
                  <PlaceCard
                    key={place.id}
                    {...place}
                    onClick={() => onPlaceClick(place.id)}
                    onHover={() => setHighlightedPlaceId(place.id)}
                    onLeave={() => setHighlightedPlaceId(null)}
                  />
                ))}
              </div>
            ) : (
              categories.map((category) => (
                <ThemeSection
                  key={category}
                  category={category}
                  places={filteredPlaces}
                  onPlaceClick={onPlaceClick}
                  onPlaceHover={setHighlightedPlaceId}
                />
              ))
            )}
          </div>

          {/* Right: Map */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24">
              <MapView
                places={filteredPlaces}
                highlightedPlaceId={highlightedPlaceId}
                onPlaceClick={onPlaceClick}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
