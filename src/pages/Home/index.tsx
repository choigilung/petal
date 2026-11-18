import { lazy, Suspense, useState } from 'react';
import type { FlowerItem } from './FlowerRing';
import './Home.css';

const FlowerRing = lazy(() => import('./FlowerRing'));

const DEFAULT_FLOWERS: FlowerItem[] = [
  { id: 'rose', name: 'Rose' },
  { id: 'tulip', name: 'Tulip' },
  { id: 'lily', name: 'Lily' },
  { id: 'peony', name: 'Peony' },
  { id: 'daisy', name: 'Daisy' },
  { id: 'ranunculus', name: 'Ranunculus' },
];

const hasWebGL = () => {
  try {
    const canvas = document.createElement('canvas');
    return !!(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
};

const Home = ({ flowers = DEFAULT_FLOWERS }: { flowers?: FlowerItem[] }) => {
  const [webgl] = useState(hasWebGL);

  return (
    <main className="home">
      <h1 className="home-title">PETAL ENTRELACES</h1>
      {webgl ? (
        <Suspense fallback={<div className="flower-ring" />}>
          <FlowerRing flowers={flowers} />
        </Suspense>
      ) : (
        <ul className="home-fallback">
          {flowers.map((f) => (
            <li key={f.id}>{f.name}</li>
          ))}
        </ul>
      )}
    </main>
  );
};

export default Home;
