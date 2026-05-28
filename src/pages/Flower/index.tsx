import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import './Flower.css';
import flowerHero from '../../assets/flower/flowerout1.jpg';
import flowerSpace from '../../assets/flower/flower_space1.jpg';

interface FlowerItem {
  id: string;
  name: string;
  subName: string;
  imageUrl: string;
}

const Flower = () => {
  const [flowers, setFlowers] = useState<FlowerItem[]>([]);

  useEffect(() => {
    const fetchFlowers = async () => {
      const snapshot = await getDocs(collection(db, 'flowers'));
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as FlowerItem));
      setFlowers(data);
    };
    fetchFlowers();
  }, []);

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
          {flowers.map((flower) => (
            <div className="flower-item" key={flower.id}>
              <img src={flower.imageUrl} alt={flower.name} className="flower-image" />
              <p className="flower-name">{flower.name}</p>
              <p className="flower-sub-name">{flower.subName}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Flower;