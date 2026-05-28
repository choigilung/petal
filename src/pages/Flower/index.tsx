import './Flower.css';

const Flower = () => {
  return (
    <main className="flower">
      {/* 히어로 섹션 */}
      <section className="flower-hero">
        <div className="flower-hero-image-placeholder" />
        <div className="flower-hero-text">
          <p className="flower-hero-sub">1F FLOWER</p>
          <h1 className="flower-hero-title">PETAL<br />FLOWER</h1>
          <p className="flower-hero-desc">일상에 꽃을 더하다</p>
        </div>
      </section>

      {/* 공간 소개 섹션 */}
      <section className="flower-space">
        <div className="flower-space-text">
          <p className="flower-space-label">OUR SPACE</p>
          <h2 className="flower-space-title">꽃이 가득한<br />1층 플라워샵</h2>
          <p className="flower-space-desc">
            페탈 옹트라쎄 1층에 위치한 플라워샵입니다.
            계절마다 바뀌는 다양한 꽃들을 만나보세요.
          </p>
        </div>
        <div className="flower-space-image-placeholder" />
      </section>

      {/* 꽃 종류 섹션 */}
      <section className="flower-types">
        <p className="flower-types-label">OUR FLOWERS</p>
        <h2 className="flower-types-title">FLOWERS</h2>
        <div className="flower-grid">
          {[
            { name: '장미', sub: 'Rose' },
            { name: '튤립', sub: 'Tulip' },
            { name: '수국', sub: 'Hydrangea' },
            { name: '작약', sub: 'Peony' },
            { name: '라넌큘러스', sub: 'Ranunculus' },
            { name: '유칼립투스', sub: 'Eucalyptus' },
          ].map((flower) => (
            <div className="flower-item" key={flower.name}>
              <div className="flower-image-placeholder" />
              <p className="flower-name">{flower.name}</p>
              <p className="flower-sub-name">{flower.sub}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Flower;