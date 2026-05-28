import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">PETAL ENTRECASSE</Link>
      </div>
      <ul className="navbar-menu">
        <li><Link to="/">1F CAFE</Link></li>
        <li><Link to="/flower">2F FLOWER</Link></li>
        <li><Link to="/coffee">COFFEE</Link></li>
        <li><Link to="/info">INFO</Link></li>
        <li><Link to="/crew">PETAL CREW</Link></li>
        <li><Link to="/community">COMMUNITY</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;