import './Flower.css';
import flowerHero from '../../assets/flower/flowerout1.jpg';
import flowerSpace from '../../assets/flower/flower_space1.jpg';
import flower1 from '../../assets/flowers/flower1.jpg';
import flower2 from '../../assets/flowers/flower2.jpg';
import flower3 from '../../assets/flowers/flower3.jpg';
import flower4 from '../../assets/flowers/flower4.jpg';
import flower5 from '../../assets/flowers/flower5.jpg';
import flower6 from '../../assets/flowers/flower6.jpg';

const Flower = () => {
  return (
    <main className="flower">
      {/* 히어로 섹션 */}
      <section className="flower-hero">
        <img src={flowerHero} alt="플라워샵 외관" className="flower-hero-image" />
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
        <img src={flowerSpace} alt="플라워샵 공간" className="flower-space-image" />
      </section>

      {/* 꽃 종류 섹션 */}
      <section className="flower-types">
        <p className="flower-types-label">OUR FLOWERS</p>
        <h2 className="flower-types-title">FLOWERS</h2>
        <div className="flower-grid">
          {[
            { name: '장미', sub: 'Rose', img: flower1 },
            { name: '튤립', sub: 'Tulip', img: flower2 },
            { name: '수국', sub: 'Hydrangea', img: flower3 },
            { name: '작약', sub: 'Peony', img: flower4 },
            { name: '라넌큘러스', sub: 'Ranunculus', img: flower5 },
            { name: '유칼립투스', sub: 'Eucalyptus', img: flower6 },
          ].map((flower) => (
            <div className="flower-item" key={flower.name}>
              <img src={flower.img} alt={flower.name} className="flower-image" />
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