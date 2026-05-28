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
            <p className="info-block-label">PHONE</p>
            <p className="info-block-value">051-000-0000</p>
          </div>

          {/* 주소 */}
          <div className="info-block">
            <p className="info-block-label">ADDRESS</p>
            <p className="info-block-value">부산광역시 OO구 OO로 OO</p>
          </div>

          {/* 영업시간 */}
          <div className="info-block">
            <p className="info-block-label">HOURS</p>
            <p className="info-block-value">
              MON — FRI　10:00 — 21:00<br />
              SAT — SUN　10:00 — 22:00
            </p>
          </div>

          {/* SNS */}
          <div className="info-block">
            <p className="info-block-label">SNS</p>
            <p className="info-block-value">@petal_entrecasse</p>
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