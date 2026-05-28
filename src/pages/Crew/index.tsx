import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import './Crew.css';

interface CrewItem {
  id: string;
  name: string;
  role: string;
  desc: string;
  imageUrl: string;
}

const Crew = () => {
  const [crew, setCrew] = useState<CrewItem[]>([]);

  useEffect(() => {
    const fetchCrew = async () => {
      const snapshot = await getDocs(collection(db, 'crew'));
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as CrewItem));
      setCrew(data);
    };
    fetchCrew();
  }, []);

  return (
    <main className="crew">
      {/* 헤더 */}
      <section className="crew-header">
        <p className="crew-label">PETAL CREW</p>
        <h1 className="crew-title">OUR CREW</h1>
        <p className="crew-desc">페탈 옹트라쎄를 만들어가는 사람들</p>
      </section>

      {/* 크루 그리드 */}
      <section className="crew-grid-section">
        <div className="crew-grid">
          {crew.map((member) => (
            <div className="crew-item" key={member.id}>
              <img src={member.imageUrl} alt={member.name} className="crew-image" />
              <div className="crew-info">
                <p className="crew-role">{member.role}</p>
                <h2 className="crew-name">{member.name}</h2>
                <p className="crew-member-desc">{member.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Crew;