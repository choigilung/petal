import { Link } from 'react-router-dom';
import './Cafe.css';
import cafeHero from '../../assets/cafe/outside1.jpg';
import cafeSpace from '../../assets/cafe/space_1.jpg';
import menuDrip from '../../assets/cafe/menu/drip/drip1.jpg';
import menuBlend from '../../assets/cafe/menu/blend/blend1.png';
import menuTea from '../../assets/cafe/menu/tea/tea1.jpg';
import menuBeverage from '../../assets/cafe/menu/beverage/beverage1.jpg';
import menuDessert from '../../assets/cafe/menu/dessert/dessert2.jpg';
const Cafe = () => {
  return (
    <main className="cafe">
      {/* 히어로 섹션 */}
      <section className="hero">
        <img src={cafeHero} alt="카페 외관" className="hero-image" />
        <div className="hero-text">
          <p className="hero-sub">2F CAFE</p>
          <h1 className="hero-title">PETAL<br />ENTRECASSE</h1>
          <p className="hero-desc">꽃과 커피가 만나는 공간</p>
        </div>
      </section>

      {/* 공간 소개 섹션 */}
      <section className="space">
        <img src={cafeSpace} alt="카페 공간" className="space-image" />
        <div className="space-text">
          <p className="space-label">OUR SPACE</p>
          <h2 className="space-title">꽃향기 가득한<br />2층 카페</h2>
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
          {[
            { name: 'DRIP', path: '/cafe/menu/drip', img: menuDrip },
            { name: 'BLEND', path: '/cafe/menu/blend', img: menuBlend },
            { name: 'TEA', path: '/cafe/menu/tea', img: menuTea },
            { name: 'BEVERAGE', path: '/cafe/menu/beverage', img: menuBeverage },
            { name: 'DESSERT', path: '/cafe/menu/dessert', img: menuDessert },
           ].map((item) => (
             <Link to={item.path} key={item.name} className="menu-item">
               <img src={item.img} alt={item.name} className="menu-image" />
               <p className="menu-name">{item.name}</p>
             </Link>
           ))}
        </div>
      </section>
    </main>
  );
};

export default Cafe;