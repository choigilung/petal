import { useState, useEffect } from 'react';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import './Community.css';

interface Notice {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

const Community = () => {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [content, setContent] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchNotices = async () => {
      const snapshot = await getDocs(collection(db, 'notices'));
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Notice));
      setNotices(data);
    };
    fetchNotices();
  }, []);

  const handleSubmit = async () => {
    if (!name || !email || !content) return alert('이름, 이메일, 문의 내용을 입력해 주세요.');
    try {
      await addDoc(collection(db, 'inquiries'), {
        name,
        email,
        phone,
        content,
        answer: '',
        createdAt: new Date().toLocaleDateString('ko-KR'),
      });
      setName('');
      setEmail('');
      setPhone('');
      setContent('');
      setSubmitted(true);
    } catch (err) {
      alert('문의 중 오류가 발생했습니다.');
    }
  };

  return (
    <main className="community">
      {/* 헤더 */}
      <section className="community-header">
        <p className="community-label">COMMUNITY</p>
        <h1 className="community-title">COMMUNITY</h1>
      </section>

      {/* 공지사항 섹션 */}
      {notices.length > 0 && (
        <section className="community-notices">
          <p className="community-section-label">NOTICE</p>
          <h2 className="community-section-title">공지사항</h2>
          <div className="notices-list">
            {notices.map((notice) => (
              <div className="notice-item" key={notice.id}>
                <p className="notice-date">{notice.createdAt}</p>
                <h3 className="notice-title">{notice.title}</h3>
                <p className="notice-content">{notice.content}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 문의 폼 */}
      <section className="community-form-section">
        <p className="community-section-label">INQUIRY</p>
        <h2 className="community-section-title">문의사항</h2>
        <p className="community-desc">궁금하신 점이 있으시면 편하게 문의해 주세요</p>

        {submitted ? (
          <div className="submit-success">
            <p>문의가 접수됐어요! 빠른 시일 내에 답변 드릴게요 😊</p>
            <button className="form-submit" onClick={() => setSubmitted(false)}>다시 문의하기</button>
          </div>
        ) : (
          <div className="community-form">
            <div className="form-group">
              <label className="form-label">이름</label>
              <input className="form-input" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="이름을 입력해 주세요" />
            </div>
            <div className="form-group">
              <label className="form-label">이메일</label>
              <input className="form-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="이메일을 입력해 주세요" />
            </div>
            <div className="form-group">
              <label className="form-label">전화번호</label>
              <input className="form-input" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="전화번호를 입력해 주세요" />
            </div>
            <div className="form-group">
              <label className="form-label">문의 내용</label>
              <textarea className="form-textarea" value={content} onChange={(e) => setContent(e.target.value)} placeholder="문의 내용을 입력해 주세요" rows={6} />
            </div>
            <button className="form-submit" onClick={handleSubmit}>문의하기</button>
          </div>
        )}
      </section>
    </main>
  );
};

export default Community;