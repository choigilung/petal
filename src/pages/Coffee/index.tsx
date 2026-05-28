import './Coffee.css';
import coffeeHero from '../../assets/coffee/coffeehero1.jpg';
import coffeeMonth from '../../assets/coffee/coffeemonth.png';
import coffee1 from '../../assets/coffee/coffee1.jpg';

const Coffee = () => {
  return (
    <main className="coffee">
      {/* 히어로 섹션 */}
      <section className="coffee-hero">
        <img src={coffeeHero} alt="커피" className="coffee-hero-image" />
        <div className="coffee-hero-text">
          <p className="coffee-hero-sub">COFFEE</p>
          <h1 className="coffee-hero-title">OUR<br />COFFEE</h1>
          <p className="coffee-hero-desc">산지에서 직접 선별한 스페셜티 커피</p>
        </div>
      </section>

      {/* 이달의 커피 섹션 */}
      <section className="coffee-monthly">
        <img src={coffeeMonth} alt="이달의 커피" className="coffee-monthly-image" />
        <div className="coffee-monthly-text">
          <p className="coffee-monthly-label">THIS MONTH</p>
          <h2 className="coffee-monthly-title">이달의 커피</h2>
          <p className="coffee-monthly-name">Ethiopia Yirgacheffe</p>
          <p className="coffee-monthly-desc">
            이번 달은 에티오피아 예가체프를 소개합니다.
            자스민과 베르가못의 플로럴한 향, 밝고 깨끗한 산미가
            특징인 스페셜티 커피입니다.
          </p>
          <p className="coffee-monthly-flavor">플로럴 · 베리 · 밝은 산미</p>
        </div>
      </section>

      {/* 원두 소개 섹션 */}
      <section className="coffee-beans">
        <p className="coffee-beans-label">SINGLE ORIGIN</p>
        <h2 className="coffee-beans-title">원두</h2>
        <div className="coffee-beans-grid">
          {[
            { name: 'Ethiopia', region: 'Yirgacheffe', flavor: '플로럴 · 베리 · 밝은 산미' },
            { name: 'Colombia', region: 'Huila', flavor: '카라멜 · 견과류 · 균형잡힌' },
            { name: 'Guatemala', region: 'Antigua', flavor: '다크초콜릿 · 스모키 · 묵직한' },
            { name: 'Kenya', region: 'Kirinyaga', flavor: '블랙커런트 · 자두 · 와인같은' },
          ].map((bean) => (
            <div className="coffee-bean-item" key={bean.name}>
              <img src={coffee1} alt={bean.name} className="coffee-bean-image" />
              <div className="coffee-bean-info">
                <p className="coffee-bean-region">{bean.region}</p>
                <h3 className="coffee-bean-name">{bean.name}</h3>
                <p className="coffee-bean-flavor">{bean.flavor}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Coffee;