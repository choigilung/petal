import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../../firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import './CommunityManage.css';

interface Notice {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  content: string;
  answer: string;
  createdAt: string;
}

const CommunityManage = () => {
  const navigate = useNavigate();
  const [notices, setNotices] = useState<Notice[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [noticeTitle, setNoticeTitle] = useState('');
  const [noticeContent, setNoticeContent] = useState('');
  const [answerMap, setAnswerMap] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) navigate('/admin');
    });
    fetchNotices();
    fetchInquiries();
    return () => unsubscribe();
  }, []);

  const fetchNotices = async () => {
    const snapshot = await getDocs(collection(db, 'notices'));
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Notice));
    setNotices(data);
  };

  const fetchInquiries = async () => {
    const snapshot = await getDocs(collection(db, 'inquiries'));
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Inquiry));
    setInquiries(data);
  };

  const handleAddNotice = async () => {
    if (!noticeTitle || !noticeContent) return alert('제목과 내용을 입력해 주세요.');
    setLoading(true);
    try {
      await addDoc(collection(db, 'notices'), {
        title: noticeTitle,
        content: noticeContent,
        createdAt: new Date().toLocaleDateString('ko-KR'),
      });
      setNoticeTitle('');
      setNoticeContent('');
      fetchNotices();
    } catch (err) {
      alert('추가 중 오류가 발생했습니다.');
    }
    setLoading(false);
  };

  const handleDeleteNotice = async (id: string) => {
    if (!window.confirm('삭제하시겠습니까?')) return;
    await deleteDoc(doc(db, 'notices', id));
    fetchNotices();
  };

  const handleAnswer = async (id: string) => {
    const answer = answerMap[id];
    if (!answer) return alert('답변을 입력해 주세요.');
    await updateDoc(doc(db, 'inquiries', id), { answer });
    fetchInquiries();
  };

  return (
    <main className="community-manage">
      <div className="manage-header">
        <button className="back-btn" onClick={() => navigate('/admin/dashboard')}>← 대시보드</button>
        <h1 className="manage-title">커뮤니티 관리</h1>
      </div>

      {/* 공지사항 추가 */}
      <section className="manage-form">
        <h2 className="manage-form-title">공지사항 작성</h2>
        <div className="manage-form-group" style={{ marginBottom: '24px' }}>
          <label className="manage-label">제목</label>
          <input
            className="manage-input"
            type="text"
            value={noticeTitle}
            onChange={(e) => setNoticeTitle(e.target.value)}
            placeholder="공지사항 제목 입력"
          />
        </div>
        <div className="manage-form-group" style={{ marginBottom: '32px' }}>
          <label className="manage-label">내용</label>
          <textarea
            className="manage-textarea"
            value={noticeContent}
            onChange={(e) => setNoticeContent(e.target.value)}
            placeholder="공지사항 내용 입력"
            rows={4}
          />
        </div>
        <button className="manage-add-btn" onClick={handleAddNotice} disabled={loading}>
          {loading ? '등록 중...' : '공지 등록'}
        </button>
      </section>

      {/* 공지사항 목록 */}
      <section className="manage-list">
        <h2 className="manage-form-title">공지사항 목록</h2>
        {notices.length === 0 && <p className="empty-text">등록된 공지사항이 없어요.</p>}
        {notices.map((notice) => (
          <div className="notice-item" key={notice.id}>
            <div className="notice-info">
              <p className="notice-date">{notice.createdAt}</p>
              <h3 className="notice-title">{notice.title}</h3>
              <p className="notice-content">{notice.content}</p>
            </div>
            <button className="manage-delete-btn" onClick={() => handleDeleteNotice(notice.id)}>삭제</button>
          </div>
        ))}
      </section>

      {/* 문의 목록 */}
      <section className="manage-list" style={{ marginTop: '48px' }}>
        <h2 className="manage-form-title">문의 목록</h2>
        {inquiries.length === 0 && <p className="empty-text">접수된 문의가 없어요.</p>}
        {inquiries.map((inquiry) => (
          <div className="inquiry-item" key={inquiry.id}>
            <div className="inquiry-info">
              <p className="inquiry-meta">{inquiry.name} · {inquiry.email} · {inquiry.phone}</p>
              <p className="inquiry-content">{inquiry.content}</p>
              {inquiry.answer && (
                <div className="inquiry-answer">
                  <p className="inquiry-answer-label">답변</p>
                  <p className="inquiry-answer-text">{inquiry.answer}</p>
                </div>
              )}
              {!inquiry.answer && (
                <div className="inquiry-answer-form">
                  <textarea
                    className="manage-textarea"
                    placeholder="답변 입력"
                    rows={3}
                    value={answerMap[inquiry.id] || ''}
                    onChange={(e) => setAnswerMap({ ...answerMap, [inquiry.id]: e.target.value })}
                  />
                  <button className="manage-add-btn" onClick={() => handleAnswer(inquiry.id)}>
                    답변 등록
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
};

export default CommunityManage;