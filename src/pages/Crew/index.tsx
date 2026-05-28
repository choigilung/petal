import './Crew.css';
import crew1 from '../../assets/crew/crew1.jpg';

const Crew = () => {
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
          {[
            { name: 'James', role: 'Barista', desc: '커피를 사랑하는 바리스타', img: crew1 },
          ].map((member) => (
            <div className="crew-item" key={member.name}>
              <img src={member.img} alt={member.name} className="crew-image" />
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