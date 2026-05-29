import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../../firebase';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import './FlowerManage.css';

interface FlowerItem {
  id: string;
  name: string;
  subName: string;
  imageUrl: string;
  description?: string;
}

const FlowerManage = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<FlowerItem[]>([]);
  const [name, setName] = useState('');
  const [subName, setSubName] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) navigate('/admin');
    });
    fetchItems();
    return () => unsubscribe();
  }, []);

  const fetchItems = async () => {
    const snapshot = await getDocs(collection(db, 'flowers'));
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as FlowerItem));
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
    if (!name || !image) return alert('이름과 사진을 입력해 주세요.');
    setLoading(true);
    try {
      const imageUrl = await uploadToCloudinary(image);
      await addDoc(collection(db, 'flowers'), { name, subName, imageUrl, description });
      setName('');
      setSubName('');
      setDescription('');
      setImage(null);
      fetchItems();
    } catch (err) {
      alert('추가 중 오류가 발생했습니다.');
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('삭제하시겠습니까?')) return;
    await deleteDoc(doc(db, 'flowers', id));
    fetchItems();
  };

  return (
    <main className="flower-manage">
      <div className="manage-header">
        <button className="back-btn" onClick={() => navigate('/admin/dashboard')}>← 대시보드</button>
        <h1 className="manage-title">꽃 관리</h1>
      </div>

      {/* 추가 폼 */}
      <section className="manage-form">
        <h2 className="manage-form-title">꽃 추가</h2>
        <div className="manage-form-grid">
          <div className="manage-form-group">
            <label className="manage-label">꽃 이름 (한글)</label>
            <input
              className="manage-input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="예: 장미"
            />
          </div>
          <div className="manage-form-group">
            <label className="manage-label">설명 (선택)</label>
            <input
              className="manage-input"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="꽃 설명 입력 (선택사항)"
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

      {/* 꽃 리스트 */}
      <section className="manage-list">
        <h2 className="manage-form-title">꽃 목록</h2>
        <div className="manage-grid">
          {items.map((item) => (
            <div className="manage-item" key={item.id}>
              <img src={item.imageUrl} alt={item.name} className="manage-image" />
              <p className="manage-item-name">{item.name}</p>
              <p className="manage-item-subname">{item.subName}</p>
              <button className="manage-delete-btn" onClick={() => handleDelete(item.id)}>삭제</button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default FlowerManage;