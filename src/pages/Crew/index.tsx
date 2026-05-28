import './Crew.css';

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
            { name: '홍길동', role: 'Barista', desc: '커피를 사랑하는 바리스타' },
            { name: '김철수', role: 'Florist', desc: '꽃으로 공간을 채우는 플로리스트' },
            { name: '이영희', role: 'Manager', desc: '페탈을 이끌어가는 매니저' },
            { name: '박지민', role: 'Barista', desc: '따뜻한 한 잔을 만드는 바리스타' },
          ].map((member) => (
            <div className="crew-item" key={member.name}>
              <div className="crew-image-placeholder" />
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