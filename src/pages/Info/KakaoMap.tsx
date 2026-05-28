import { useEffect } from 'react';

declare global {
  interface Window {
    kakao: any;
  }
}

const KakaoMap = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_MAP_KEY}&autoload=false`;
    script.async = true;

    script.onload = () => {
      console.log('카카오 SDK 로드 완료');
      window.kakao.maps.load(() => {
        console.log('카카오 맵 로드 완료');
        const container = document.getElementById('map');
        if (!container) return;
        const options = {
          center: new window.kakao.maps.LatLng(35.1796, 129.0756),
          level: 3,
        };
        const map = new window.kakao.maps.Map(container, options);
        const markerPosition = new window.kakao.maps.LatLng(35.1796, 129.0756);
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
        });
        marker.setMap(map);
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