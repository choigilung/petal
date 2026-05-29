import { useEffect, useState } from 'react';
import { auth } from '../../../firebase';
import { useNavigate } from 'react-router-dom';
import { signOut, createUserWithEmailAndPassword } from 'firebase/auth';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [_user, setUser] = useState<any>(null);
  const [showAddAdmin, setShowAddAdmin] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [addLoading, setAddLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (!currentUser) {
        navigate('/admin');
      } else {
        setUser(currentUser);
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/admin');
  };

  const handleAddAdmin = async () => {
    if (!newEmail || !newPassword) return alert('이메일과 비밀번호를 입력해 주세요.');
    if (newPassword.length < 6) return alert('비밀번호는 6자 이상이어야 해요.');
    setAddLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, newEmail, newPassword);
      alert('관리자 계정이 추가됐어요!');
      setNewEmail('');
      setNewPassword('');
      setShowAddAdmin(false);
    } catch (err: any) {
      if (err.code === 'auth/email-already-in-use') {
        alert('이미 사용 중인 이메일이에요.');
      } else {
        alert('추가 중 오류가 발생했습니다.');
      }
    }
    setAddLoading(false);
  };

  return (
    <main className="dashboard">
      <div className="dashboard-header">
        <h1 className="dashboard-title">관리자 대시보드</h1>
        <div className="dashboard-header-btns">
          <button className="dashboard-add-admin-btn" onClick={() => setShowAddAdmin(!showAddAdmin)}>
            관리자 추가
          </button>
          <button className="dashboard-logout" onClick={handleLogout}>로그아웃</button>
        </div>
      </div>

      {/* 관리자 추가 폼 */}
      {showAddAdmin && (
        <section className="add-admin-form">
          <h2 className="add-admin-title">관리자 계정 추가</h2>
          <div className="add-admin-grid">
            <div className="manage-form-group">
              <label className="manage-label">이메일</label>
              <input
                className="manage-input"
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="이메일 입력"
              />
            </div>
            <div className="manage-form-group">
              <label className="manage-label">비밀번호 (6자 이상)</label>
              <input
                className="manage-input"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="비밀번호 입력"
              />
            </div>
          </div>
          <button className="manage-add-btn" onClick={handleAddAdmin} disabled={addLoading}>
            {addLoading ? '추가 중...' : '추가하기'}
          </button>
        </section>
      )}

      <div className="dashboard-grid">
        <div className="dashboard-card" onClick={() => navigate('/admin/menu')}>
          <p className="dashboard-card-label">CAFE</p>
          <h2 className="dashboard-card-title">메뉴 관리</h2>
          <p className="dashboard-card-desc">메뉴 사진 추가 / 삭제</p>
        </div>

        <div className="dashboard-card" onClick={() => navigate('/admin/flower')}>
          <p className="dashboard-card-label">FLOWER</p>
          <h2 className="dashboard-card-title">꽃 관리</h2>
          <p className="dashboard-card-desc">꽃 사진 추가 / 삭제</p>
        </div>

        <div className="dashboard-card" onClick={() => navigate('/admin/coffee')}>
          <p className="dashboard-card-label">COFFEE</p>
          <h2 className="dashboard-card-title">커피 관리</h2>
          <p className="dashboard-card-desc">이달의 커피 / 원두 / 히어로 사진 관리</p>
        </div>

        <div className="dashboard-card" onClick={() => navigate('/admin/crew')}>
          <p className="dashboard-card-label">CREW</p>
          <h2 className="dashboard-card-title">크루 관리</h2>
          <p className="dashboard-card-desc">크루 사진 추가 / 삭제</p>
        </div>

        <div className="dashboard-card" onClick={() => navigate('/admin/community')}>
          <p className="dashboard-card-label">COMMUNITY</p>
          <h2 className="dashboard-card-title">커뮤니티 관리</h2>
          <p className="dashboard-card-desc">공지사항 작성 / 문의 답변</p>
        </div>
        <div className="dashboard-card" onClick={() => navigate('/admin/images')}>
          <p className="dashboard-card-label">IMAGES</p>
          <h2 className="dashboard-card-title">사진 관리</h2>
          <p className="dashboard-card-desc">히어로 / 공간 대표사진 변경</p>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;