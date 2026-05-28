import { useEffect } from 'react';

declare global {
  interface Window {
    kakao: any;
  }
}

const KakaoMap = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_MAP_KEY}&autoload=false&libraries=services`;
    script.async = true;

    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById('map');
        if (!container) return;

        const options = {
          center: new window.kakao.maps.LatLng(35.2311, 128.6891),
          level: 3,
        };
        const map = new window.kakao.maps.Map(container, options);

        const places = new window.kakao.maps.services.Places();
        places.keywordSearch('페탈옹트라쎄 플라워 카페', (result: any, status: any) => {
          if (status === window.kakao.maps.services.Status.OK) {
            const place = result[0];
            const position = new window.kakao.maps.LatLng(place.y, place.x);

            map.setCenter(position);

            const marker = new window.kakao.maps.Marker({ position });
            marker.setMap(map);
          }
        });
      });
    };

    script.onerror = () => {
      console.log('카카오 SDK 로드 실패');
    };

    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  return (
    <div id="map" style={{ width: '100%', height: '600px' }} />
  );
};

export default KakaoMap;