import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../../firebase';
import './MenuDetail.css';

interface MenuItem {
  id: string;
  name: string;
  category: string;
  imageUrl: string;
}

interface MenuDetailProps {
  category: string;
}

const ITEMS_PER_PAGE = 9;

const MenuDetail = ({ category }: MenuDetailProps) => {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchItems = async () => {
      const q = query(collection(db, 'menu'), where('category', '==', category));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as MenuItem));
      setItems(data);
    };
    fetchItems();
  }, [category]);

  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);
  const currentItems = items.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <main className="menu-detail">
      {/* 헤더 */}
      <section className="menu-detail-header">
        <Link to="/cafe" className="back-btn">← BACK</Link>
        <p className="menu-detail-label">2F CAFE</p>
        <h1 className="menu-detail-title">{category}</h1>
      </section>

      {/* 메뉴 그리드 */}
      <section className="menu-detail-list">
        {currentItems.length === 0 && (
          <p className="empty-text">등록된 메뉴가 없어요.</p>
        )}
        <div className="menu-detail-grid">
          {currentItems.map((item) => (
            <div className="menu-detail-item" key={item.id}>
              <img src={item.imageUrl} alt={item.name} className="menu-detail-image" />
              <p className="menu-detail-name">{item.name}</p>
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

export default MenuDetail;