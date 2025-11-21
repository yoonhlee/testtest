import { useState, useEffect } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { Plus, Minus, Locate } from "lucide-react";
import { Button } from "./ui/button";

interface Place {
  id: number;
  name: string;
  lat: number;
  lng: number;
  category: string;
  rating: number;
}

interface MapViewProps {
  places: Place[];
  highlightedPlaceId?: number | null;
  onPlaceClick: (placeId: number) => void;
}

export function MapView({ places, highlightedPlaceId, onPlaceClick }: MapViewProps) {
  // 1. 지도 초기 설정 (대구 경산 중심)
  const [center, setCenter] = useState({ lat: 35.8364, lng: 128.7544 });
  const [level, setLevel] = useState(5); // 줌 레벨 (낮을수록 확대)

  // 2. 리스트에서 장소에 마우스를 올리면(Highlight) 지도 중심 이동
  useEffect(() => {
    if (highlightedPlaceId) {
      const targetPlace = places.find((p) => p.id === highlightedPlaceId);
      if (targetPlace) {
        setCenter({ lat: targetPlace.lat, lng: targetPlace.lng });
        // 마커가 잘 보이게 살짝 확대
        setLevel(4);
      }
    }
  }, [highlightedPlaceId, places]);

  // 3. 줌 컨트롤 기능
  const handleZoomIn = () => setLevel((prev) => Math.max(prev - 1, 1));
  const handleZoomOut = () => setLevel((prev) => Math.min(prev + 1, 14));

  // 4. 내 위치 찾기 기능
  const handleLocateMe = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setLevel(4);
        },
        () => alert("위치 정보를 가져올 수 없습니다.")
      );
    } else {
      alert("이 브라우저는 위치 정보를 지원하지 않습니다.");
    }
  };

  return (
    // 지도가 들어갈 컨테이너 (높이값 필수!)
    <div className="relative w-full h-[calc(100vh-120px)] bg-gray-100 rounded-2xl overflow-hidden">
      <Map
        center={center}
        level={level}
        style={{ width: "100%", height: "100%" }}
        onZoomChanged={(map) => setLevel(map.getLevel())}
        // 드래그로 이동 시 중심좌표 동기화는 선택사항 (여기선 생략하여 UX를 부드럽게 함)
      >
        {/* 장소 마커 표시 */}
        {places.map((place) => {
          const isHighlighted = highlightedPlaceId === place.id;
          
          return (
            <MapMarker
              key={place.id}
              position={{ lat: place.lat, lng: place.lng }}
              onClick={() => onPlaceClick(place.id)}
              // 마커 이미지 변경 (선택된 경우 다른 이미지 사용)
              image={{
                src: isHighlighted 
                  ? "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png" 
                  : "https://t1.daumcdn.net/mapjsapi/images/marker.png",
                size: isHighlighted ? { width: 29, height: 42 } : { width: 24, height: 35 },
              }}
              title={place.name}
            >
              {/* 선택된 마커 위에 이름 표시 */}
              {isHighlighted && (
                <div className="p-2 min-w-[150px] text-center bg-white text-gray-900 rounded-lg shadow-md text-sm font-medium border border-gray-200 z-10">
                  {place.name}
                  <div className="text-xs text-yellow-500 font-normal mt-1">
                    ★ {place.rating.toFixed(1)}
                  </div>
                </div>
              )}
            </MapMarker>
          );
        })}
      </Map>

      {/* 맵 컨트롤 버튼들 */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-2 z-10">
        <Button
          variant="secondary"
          size="icon"
          className="rounded-full bg-white shadow-lg hover:bg-gray-100"
          onClick={handleZoomIn}
        >
          <Plus className="w-5 h-5" />
        </Button>
        <Button
          variant="secondary"
          size="icon"
          className="rounded-full bg-white shadow-lg hover:bg-gray-100"
          onClick={handleZoomOut}
        >
          <Minus className="w-5 h-5" />
        </Button>
        <Button
          variant="secondary"
          size="icon"
          className="rounded-full bg-white shadow-lg hover:bg-gray-100"
          onClick={handleLocateMe}
        >
          <Locate className="w-5 h-5" />
        </Button>
      </div>

      {/* 위치 표시 라벨 */}
      <div className="absolute top-4 left-4 bg-white px-4 py-2 rounded-full shadow-lg z-10">
        <span className="text-sm text-gray-700">📍 대구/경산 주변</span>
      </div>
    </div>
  );
}