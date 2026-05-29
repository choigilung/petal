import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import './Flower.css';

interface FlowerItem {
  id: string;
  name: string;
  subName: string;
  imageUrl: string;
}

interface SiteImage {
  id: string;
  key: string;
  imageUrl: string;
}

const ITEMS_PER_PAGE = 6;

const Flower = () => {
  const [flowers, setFlowers] = useState<FlowerItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [heroImage, setHeroImage] = useState<string>('');
  const [spaceImage, setSpaceImage] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await getDocs(collection(db, 'flowers'));
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as FlowerItem));
      setFlowers(data);

      const imageSnapshot = await getDocs(collection(db, 'siteImages'));
      const images = imageSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as SiteImage));

      const hero = images.find((img) => img.key === 'flower-hero');
      const space = images.find((img) => img.key === 'flower-space');

      if (hero) setHeroImage(hero.imageUrl);
      if (space) setSpaceImage(space.imageUrl);
    };
    fetchData();
  }, []);

  const filteredFlowers = flowers.filter((flower) =>
    flower.name.toLowerCase().includes(search.toLowerCase()) ||
    flower.subName.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filteredFlowers.length / ITEMS_PER_PAGE);
  const currentFlowers = filteredFlowers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <main className="flower">
      {/* 히어로 섹션 */}
      <section className="flower-hero">
        {heroImage && <img src={heroImage} alt="플라워샵 외관" className="flower-hero-image" />}
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
        {spaceImage && <img src={spaceImage} alt="플라워샵 공간" className="flower-space-image" />}
      </section>

      {/* 꽃 종류 섹션 */}
      <section className="flower-types">
        <p className="flower-types-label">OUR FLOWERS</p>
        <h2 className="flower-types-title">FLOWERS</h2>

        {/* 검색 */}
        <div className="flower-search">
          <input
            className="flower-search-input"
            type="text"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
            placeholder="꽃 검색"
          />
        </div>

        <div className="flower-grid">
          {currentFlowers.length === 0 && (
            <p className="empty-text">검색 결과가 없어요.</p>
          )}
          {currentFlowers.map((flower) => (
            <div className="flower-item" key={flower.id}>
              <img src={flower.imageUrl} alt={flower.name} className="flower-image" />
              <p className="flower-name">{flower.name}</p>
              <p className="flower-sub-name">{flower.subName}</p>
            </div>
          ))}
        </div>

        {/* 페이지네이션 */}
        {totalPages > 1 && (
          <div className="pagination">
            <button
              className="pagination-btn"
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
            >
              ←
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
            <button
              className="pagination-btn"
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              →
            </button>
          </div>
        )}
      </section>
    </main>
  );
};

export default Flower;