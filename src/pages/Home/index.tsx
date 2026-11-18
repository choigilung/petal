import { lazy, Suspense, useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import type { FlowerItem } from './FlowerRing';
import './Home.css';

const FlowerRing = lazy(() => import('./FlowerRing'));

const hasWebGL = () => {
  try {
    const canvas = document.createElement('canvas');
    return !!(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
};

const Home = () => {
  const [webgl] = useState(hasWebGL);
  const [flowers, setFlowers] = useState<FlowerItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await getDocs(collection(db, 'flowers'));
      setFlowers(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as FlowerItem)));
    };
    fetchData().catch(console.error);
  }, []);

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
