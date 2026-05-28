import { useEffect, useState } from 'react';
import { auth } from '../../../firebase';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

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

  return (
    <main className="dashboard">
      <div className="dashboard-header">
        <h1 className="dashboard-title">관리자 대시보드</h1>
        <button className="dashboard-logout" onClick={handleLogout}>로그아웃</button>
      </div>

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
      </div>
    </main>
  );
};

export default Dashboard;