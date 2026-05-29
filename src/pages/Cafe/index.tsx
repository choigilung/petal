import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import './Cafe.css';
import cafeHero from '../../assets/cafe/outside1.jpg';
import cafeSpace from '../../assets/cafe/space_1.jpg';

interface MenuItem {
  id: string;
  name: string;
  category: string;
  imageUrl: string;
}

interface SiteImage {
  id: string;
  key: string;
  imageUrl: string;
}

const CATEGORIES = ['DRIP', 'BLEND', 'TEA', 'BEVERAGE', 'DESSERT'];

const Cafe = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [heroImage, setHeroImage] = useState<string>(cafeHero);
  const [spaceImage, setSpaceImage] = useState<string>(cafeSpace);

  useEffect(() => {
    const fetchData = async () => {
      const menuSnapshot = await getDocs(collection(db, 'menu'));
      const menuData = menuSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as MenuItem));
      setMenuItems(menuData);

      const imageSnapshot = await getDocs(collection(db, 'siteImages'));
      const images = imageSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as SiteImage));
      
      const hero = images.find((img) => img.key === 'cafe-hero');
      const space = images.find((img) => img.key === 'cafe-space');
      
      if (hero) setHeroImage(hero.imageUrl);
      if (space) setSpaceImage(space.imageUrl);
    };
    fetchData();
  }, []);

  return (
    <main className="cafe">
      {/* 히어로 섹션 */}
      <section className="hero">
        <img src={heroImage} alt="카페 외관" className="hero-image" />
        <div className="hero-text">
          <p className="hero-sub">2F CAFE</p>
          <h1 className="hero-title">PETAL<br />ENTRECASSE</h1>
          <p className="hero-desc">꽃과 커피가 만나는 공간</p>
        </div>
      </section>

      {/* 공간 소개 섹션 */}
      <section className="space">
        <img src={spaceImage} alt="카페 공간" className="space-image" />
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
          {CATEGORIES.map((cat) => {
            const item = menuItems.find((m) => m.category === cat);
            return (
              <Link to={`/cafe/menu/${cat.toLowerCase()}`} key={cat} className="menu-item">
                {item ? (
                  <img src={item.imageUrl} alt={cat} className="menu-image" />
                ) : (
                  <div className="menu-image-placeholder" />
                )}
                <p className="menu-name">{cat}</p>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
};

export default Cafe;