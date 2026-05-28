import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Cafe from './pages/Cafe';
import Flower from './pages/Flower';
import Coffee from './pages/Coffee';
import Info from './pages/Info';
import Crew from './pages/Crew';
import Community from './pages/Community';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Cafe />} />
        <Route path="/cafe" element={<Cafe />} />
        <Route path="/flower" element={<Flower />} />
        <Route path="/coffee" element={<Coffee />} />
        <Route path="/info" element={<Info />} />
        <Route path="/crew" element={<Crew />} />
        <Route path="/community" element={<Community />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
