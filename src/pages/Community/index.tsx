import './Community.css';

const Community = () => {
  return (
    <main className="community">
      {/* 헤더 */}
      <section className="community-header">
        <p className="community-label">COMMUNITY</p>
        <h1 className="community-title">문의사항</h1>
        <p className="community-desc">궁금하신 점이 있으시면 편하게 문의해 주세요</p>
      </section>

      {/* 문의 폼 */}
      <section className="community-form-section">
        <div className="community-form">
          <div className="form-group">
            <label className="form-label">이름</label>
            <input className="form-input" type="text" placeholder="이름을 입력해 주세요" />
          </div>

          <div className="form-group">
            <label className="form-label">이메일</label>
            <input className="form-input" type="email" placeholder="이메일을 입력해 주세요" />
          </div>

          <div className="form-group">
            <label className="form-label">전화번호</label>
            <input className="form-input" type="tel" placeholder="전화번호를 입력해 주세요" />
          </div>

          <div className="form-group">
            <label className="form-label">문의 내용</label>
            <textarea className="form-textarea" placeholder="문의 내용을 입력해 주세요" rows={6} />
          </div>

          <button className="form-submit">문의하기</button>
        </div>
      </section>
    </main>
  );
};

export default Community;