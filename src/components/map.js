import React, { useEffect, useRef } from "react";

const MapComponent = ({ mapId, address, onCoordinatesChange, mapHeight }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) {
      const mapElement = document.getElementById(mapId);
      if (!mapElement) {
        console.error(`ID가 "${mapId}"인 지도 요소가 렌더링되지 않았습니다.`);
        return;
      }

      const mapOption = {
        center: new window.kakao.maps.LatLng(33.450701, 126.570667),
        level: 3,
      };

      mapRef.current = new window.kakao.maps.Map(mapElement, mapOption);
    }
  }, [mapId]);

  useEffect(() => {
    if (address) {
      const geocoder = new window.kakao.maps.services.Geocoder();
      geocoder.addressSearch(address, function (result, status) {
        if (status === window.kakao.maps.services.Status.OK) {
          const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

          if (onCoordinatesChange) {
            onCoordinatesChange({ latitude: result[0].y, longitude: result[0].x });
          }

          new window.kakao.maps.Marker({
            map: mapRef.current,
            position: coords,
          });

          mapRef.current.setCenter(coords);
        } else {
          console.error("주소 검색에 실패했습니다. 상태:", status);
        }
      });
    }
  }, [address, onCoordinatesChange]);

  return <div id={mapId} style={{ width: "100%", height: `${mapHeight}` }}></div>;
};

export default MapComponent;
