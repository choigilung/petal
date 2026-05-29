import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <p className="footer-logo">PETALES ENTRELACES</p>
          <p className="footer-tagline">꽃과 커피가 만나는 공간</p>
        </div>

        <div className="footer-links">
          <div className="footer-col">
            <p className="footer-col-title">VISIT</p>
            <p className="footer-col-text">경남 창원시 성산구 외동반림로254번길 34</p>
            <p className="footer-col-text">0507-1496-4462</p>
          </div>

          <div className="footer-col">
            <p className="footer-col-title">HOURS</p>
            <p className="footer-col-text">TUE — SUN　11:30 — 22:00</p>
            <p className="footer-col-text">MON 12:00 - 22:00</p>
          </div>

          <div className="footer-col">
            <p className="footer-col-title">PAGES</p>
            <Link to="/flower" className="footer-col-link">FLOWER</Link>
            <Link to="/cafe" className="footer-col-link">CAFE</Link>
            <Link to="/coffee" className="footer-col-link">COFFEE</Link>
            <Link to="/info" className="footer-col-link">INFO</Link>
            <Link to="/community" className="footer-col-link">COMMUNITY</Link>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="footer-copy">© 2024 PETALES ENTRELACES. ALL RIGHTS RESERVED.</p>
        <div className="footer-bottom-right">
          <p className="footer-sns">@petales_entrelaces</p>
          <a href="/admin" className="footer-admin">ADMIN</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;