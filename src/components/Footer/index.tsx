import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <p className="footer-logo">PETAL ENTRECASSE</p>
          <p className="footer-tagline">꽃과 커피가 만나는 공간</p>
        </div>

        <div className="footer-links">
          <div className="footer-col">
            <p className="footer-col-title">VISIT</p>
            <p className="footer-col-text">부산광역시 OO구 OO로 OO</p>
            <p className="footer-col-text">051-000-0000</p>
          </div>

          <div className="footer-col">
            <p className="footer-col-title">HOURS</p>
            <p className="footer-col-text">MON — FRI　10:00 — 21:00</p>
            <p className="footer-col-text">SAT — SUN　10:00 — 22:00</p>
          </div>

          <div className="footer-col">
            <p className="footer-col-title">MENU</p>
            <Link to="/cafe" className="footer-col-link">2F CAFE</Link>
            <Link to="/flower" className="footer-col-link">1F FLOWER</Link>
            <Link to="/coffee" className="footer-col-link">COFFEE</Link>
            <Link to="/info" className="footer-col-link">INFO</Link>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="footer-copy">© 2024 PETAL ENTRECASSE. ALL RIGHTS RESERVED.</p>
        <div className="footer-bottom-right">
          <p className="footer-sns">@petal_entrecasse</p>
          <a href="/admin" className="footer-admin">ADMIN</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;