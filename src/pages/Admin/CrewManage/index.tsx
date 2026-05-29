import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../../firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, Timestamp } from 'firebase/firestore';
import './CrewManage.css';

interface CrewItem {
  id: string;
  name: string;
  role: string;
  desc: string;
  imageUrl: string;
  createdAt?: Timestamp;
}

const CrewManage = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<CrewItem[]>([]);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [desc, setDesc] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) navigate('/admin');
    });
    fetchItems();
    return () => unsubscribe();
  }, []);

  const fetchItems = async () => {
    const snapshot = await getDocs(collection(db, 'crew'));
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as CrewItem));
    setItems(data);
  };

  const uploadToCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
      { method: 'POST', body: formData }
    );
    const data = await res.json();
    return data.secure_url;
  };

  const handleAdd = async () => {
    if (!name || !role || !image) return alert('이름, 역할, 사진을 입력해 주세요.');
    setLoading(true);
    try {
      const imageUrl = await uploadToCloudinary(image);
      await addDoc(collection(db, 'crew'), {
        name, role, desc, imageUrl,
        createdAt: Timestamp.now()
      });
      setName('');
      setRole('');
      setDesc('');
      setImage(null);
      fetchItems();
    } catch (err) {
      alert('추가 중 오류가 발생했습니다.');
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('삭제하시겠습니까?')) return;
    await deleteDoc(doc(db, 'crew', id));
    fetchItems();
  };

  const formatDate = (timestamp?: Timestamp) => {
    if (!timestamp) return '';
    const date = timestamp.toDate();
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
  };

  return (
    <main className="crew-manage">
      <div className="manage-header">
        <button className="back-btn" onClick={() => navigate('/admin/dashboard')}>← 대시보드</button>
        <h1 className="manage-title">크루 관리</h1>
      </div>

      {/* 추가 폼 */}
      <section className="manage-form">
        <h2 className="manage-form-title">크루 추가</h2>
        <div className="manage-form-grid">
          <div className="manage-form-group">
            <label className="manage-label">이름</label>
            <input
              className="manage-input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="이름 입력"
            />
          </div>
          <div className="manage-form-group">
            <label className="manage-label">역할</label>
            <input
              className="manage-input"
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="예: Barista"
            />
          </div>
          <div className="manage-form-group">
            <label className="manage-label">소개글</label>
            <input
              className="manage-input"
              type="text"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="간단한 소개글"
            />
          </div>
          <div className="manage-form-group">
            <label className="manage-label">사진</label>
            <input
              className="manage-input"
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
            />
          </div>
        </div>
        <button className="manage-add-btn" onClick={handleAdd} disabled={loading}>
          {loading ? '추가 중...' : '추가하기'}
        </button>
      </section>

      {/* 크루 리스트 */}
      <section className="manage-list">
        <h2 className="manage-form-title">크루 목록</h2>
        <div className="manage-grid">
          {items.map((item) => (
            <div className="manage-item" key={item.id}>
              <img src={item.imageUrl} alt={item.name} className="manage-image" />
              <p className="manage-item-role">{item.role}</p>
              <p className="manage-item-name">{item.name}</p>
              <p className="manage-item-desc">{item.desc}</p>
              {item.createdAt && (
                <p className="manage-item-date">{formatDate(item.createdAt)}</p>
              )}
              <button className="manage-delete-btn" onClick={() => handleDelete(item.id)}>삭제</button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default CrewManage;