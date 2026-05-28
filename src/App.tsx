import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Cafe from './pages/Cafe';
import Flower from './pages/Flower';
import Coffee from './pages/Coffee';
import Info from './pages/Info';
import Crew from './pages/Crew';
import Community from './pages/Community';
import Drip from './pages/Cafe/Menu/Drip';
import Blend from './pages/Cafe/Menu/Blend';
import Tea from './pages/Cafe/Menu/Tea';
import Beverage from './pages/Cafe/Menu/Beverage';
import Dessert from './pages/Cafe/Menu/Dessert';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Cafe />} />
        <Route path="/cafe" element={<Cafe />} />
        <Route path="/cafe/menu/drip" element={<Drip />} />
        <Route path="/cafe/menu/blend" element={<Blend />} />
        <Route path="/cafe/menu/tea" element={<Tea />} />
        <Route path="/cafe/menu/beverage" element={<Beverage />} />
        <Route path="/cafe/menu/dessert" element={<Dessert />} />
        <Route path="/flower" element={<Flower />} />
        <Route path="/coffee" element={<Coffee />} />
        <Route path="/info" element={<Info />} />
        <Route path="/crew" element={<Crew />} />
        <Route path="/community" element={<Community />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
