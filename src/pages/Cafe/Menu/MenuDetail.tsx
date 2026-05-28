import { Link } from 'react-router-dom';
import './MenuDetail.css';

interface MenuItem {
  name: string;
  description: string;
  price: string;
}

interface MenuDetailProps {
  category: string;
  items: MenuItem[];
}

const MenuDetail = ({ category, items }: MenuDetailProps) => {
  return (
    <main className="menu-detail">
      {/* 헤더 */}
      <section className="menu-detail-header">
        <Link to="/cafe" className="back-btn">← BACK</Link>
        <p className="menu-detail-label">2F CAFE</p>
        <h1 className="menu-detail-title">{category}</h1>
      </section>

      {/* 메뉴 리스트 */}
      <section className="menu-detail-list">
        {items.map((item) => (
          <div className="menu-detail-item" key={item.name}>
            <div className="menu-detail-image-placeholder" />
            <div className="menu-detail-info">
              <h2 className="menu-detail-name">{item.name}</h2>
              <p className="menu-detail-desc">{item.description}</p>
              <p className="menu-detail-price">{item.price}</p>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
};

export default MenuDetail;