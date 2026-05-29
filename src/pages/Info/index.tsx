import './Info.css';
import KakaoMap from './KakaoMap';

const Info = () => {
  return (
    <main className="info">
      {/* 헤더 */}
      <section className="info-header">
        <p className="info-label">INFO</p>
        <h1 className="info-title">VISIT US</h1>
      </section>

      {/* 정보 섹션 */}
      <section className="info-content">
        <div className="info-details">
          {/* 전화번호 */}
          <div className="info-block">
            <p className="info-block-label">TEL</p>
            <p className="info-block-value">0507-1496-4462</p>
          </div>

          {/* 주소 */}
          <div className="info-block">
            <p className="info-block-label">ADDRESS</p>
            <p className="info-block-value">경남 창원시 성산구 외동반림로254번길 34</p>
          </div>

          {/* 영업시간 */}
          <div className="info-block">
            <p className="info-block-label">HOURS</p>
            <p className="info-block-value">
              TUE — SUN　11:30 — 22:00<br />
              MON 12:00 - 22:00
            </p>
          </div>

          {/* SNS */}
          <div className="info-block">
            <p className="info-block-label">SNS</p>
            <a 
              href="https://www.instagram.com/petales.cafe" 
              target="_blank" 
              rel="noopener noreferrer"
              className="info-block-link"
            >
              @petales.cafe
            </a>
            <a 
              href="https://www.instagram.com/petales_entrelaces" 
              target="_blank" 
              rel="noopener noreferrer"
              className="info-block-link"
            >
              @petales_entrelaces
            </a>
          </div>
        </div>  

        {/* 카카오맵 */}
        <div className="info-map">
          <KakaoMap />
        </div>
      </section>
    </main>
  );
};

export default Info;