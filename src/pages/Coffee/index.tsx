import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import './Coffee.css';
import coffeeHero from '../../assets/coffee/coffeehero1.jpg';

interface BeanItem {
  id: string;
  name: string;
  region: string;
  flavor: string;
  imageUrl: string;
}

interface MonthlyItem {
  id: string;
  name: string;
  description: string;
  flavor: string;
  imageUrl: string;
}

const Coffee = () => {
  const [beans, setBeans] = useState<BeanItem[]>([]);
  const [monthly, setMonthly] = useState<MonthlyItem | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const beansSnapshot = await getDocs(collection(db, 'beans'));
      const beansData = beansSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as BeanItem));
      setBeans(beansData);

      const monthlySnapshot = await getDocs(collection(db, 'monthly'));
      if (!monthlySnapshot.empty) {
        const data = { id: monthlySnapshot.docs[0].id, ...monthlySnapshot.docs[0].data() } as MonthlyItem;
        setMonthly(data);
      }
    };
    fetchData();
  }, []);

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
      {monthly && (
        <section className="coffee-monthly">
          <img src={monthly.imageUrl} alt="이달의 커피" className="coffee-monthly-image" />
          <div className="coffee-monthly-text">
            <p className="coffee-monthly-label">THIS MONTH</p>
            <h2 className="coffee-monthly-title">이달의 커피</h2>
            <p className="coffee-monthly-name">{monthly.name}</p>
            <p className="coffee-monthly-desc">{monthly.description}</p>
            <p className="coffee-monthly-flavor">{monthly.flavor}</p>
          </div>
        </section>
      )}

      {/* 원두 소개 섹션 */}
      {beans.length > 0 && (
        <section className="coffee-beans">
          <p className="coffee-beans-label">SINGLE ORIGIN</p>
          <h2 className="coffee-beans-title">원두</h2>
          <div className="coffee-beans-grid">
            {beans.map((bean) => (
              <div className="coffee-bean-item" key={bean.id}>
                <img src={bean.imageUrl} alt={bean.name} className="coffee-bean-image" />
                <div className="coffee-bean-info">
                  <p className="coffee-bean-region">{bean.region}</p>
                  <h3 className="coffee-bean-name">{bean.name}</h3>
                  <p className="coffee-bean-flavor">{bean.flavor}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
};

export default Coffee;