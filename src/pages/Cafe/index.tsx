import './Cafe.css';

const Cafe = () => {
  return (
    <main className="cafe">
      {/* 히어로 섹션 */}
      <section className="hero">
        <div className="hero-image-placeholder" />
        <div className="hero-text">
          <p className="hero-sub">2F CAFE</p>
          <h1 className="hero-title">PETAL<br />ENTRECASSE</h1>
          <p className="hero-desc">꽃과 커피가 만나는 공간</p>
        </div>
      </section>

      {/* 공간 소개 섹션 */}
      <section className="space">
        <div className="space-image-placeholder" />
        <div className="space-text">
          <p className="space-label">OUR SPACE</p>
          <h2 className="space-title">따뜻한 공간에서<br />즐기는 한 잔</h2>
          <p className="space-desc">
            페탈 옹트라쎄는 1층 플라워샵과 2층 카페로 이루어진
            복합 문화 공간입니다.
          </p>
        </div>
      </section>

      {/* 메뉴 섹션 */}
      <section className="menu-preview">
        <p className="menu-label">OUR MENU</p>
        <h2 className="menu-title">MENU</h2>
        <div className="menu-grid">
          {['DRIP', 'BLEND', 'TEA', 'BEVERAGE', 'DESSERT'].map((item) => (
            <div className="menu-item" key={item}>
              <div className="menu-image-placeholder" />
              <p className="menu-name">{item}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Cafe;