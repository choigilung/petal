import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import './Admin.css';

const Admin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/admin/dashboard');
    } catch (err) {
      setError('이메일 또는 비밀번호가 올바르지 않습니다.');
    }
  };

  return (
    <main className="admin-login">
      <div className="admin-login-box">
        <p className="admin-login-label">ADMIN</p>
        <h1 className="admin-login-title">관리자 로그인</h1>

        <form className="admin-login-form" onSubmit={handleLogin}>
          <div className="admin-form-group">
            <label className="admin-form-label">이메일</label>
            <input
              className="admin-form-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일을 입력해 주세요"
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">비밀번호</label>
            <input
              className="admin-form-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력해 주세요"
            />
          </div>

          {error && <p className="admin-error">{error}</p>}

          <button className="admin-login-btn" type="submit">
            로그인
          </button>
        </form>
      </div>
    </main>
  );
};

export default Admin;