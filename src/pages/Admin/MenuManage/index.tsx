import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../../firebase';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import './MenuManage.css';

interface MenuItem {
  id: string;
  name: string;
  category: string;
  imageUrl: string;
  price: string;
  description: string;
}

const CATEGORIES = ['DRIP', 'BLEND', 'TEA', 'BEVERAGE', 'DESSERT'];

const MenuManage = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<MenuItem[]>([]);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('DRIP');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
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
    const snapshot = await getDocs(collection(db, 'menu'));
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as MenuItem));
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
      await addDoc(collection(db, 'menu'), { name, category, imageUrl, price, description });
      setName('');
      setPrice('');
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
    await deleteDoc(doc(db, 'menu', id));
    fetchItems();
  };

  return (
    <main className="menu-manage">
      <div className="manage-header">
        <button className="back-btn" onClick={() => navigate('/admin/dashboard')}>← 대시보드</button>
        <h1 className="manage-title">메뉴 관리</h1>
      </div>

      {/* 추가 폼 */}
      <section className="manage-form">
        <h2 className="manage-form-title">메뉴 추가</h2>
        <div className="manage-form-grid">
          <div className="manage-form-group">
            <label className="manage-label">카테고리</label>
            <select className="manage-select" value={category} onChange={(e) => setCategory(e.target.value)}>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div className="manage-form-group">
            <label className="manage-label">메뉴 이름</label>
            <input
              className="manage-input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="메뉴 이름 입력"
            />
          </div>
          <div className="manage-form-group">
            <label className="manage-label">가격</label>
            <input
              className="manage-input"
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="예: 6,500원"
            />
          </div>
          <div className="manage-form-group">
            <label className="manage-label">설명</label>
            <input
              className="manage-input"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="메뉴 설명 입력"
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

      {/* 메뉴 리스트 */}
      <section className="manage-list">
        <h2 className="manage-form-title">메뉴 목록</h2>
        {CATEGORIES.map((cat) => (
          <div key={cat} className="manage-category">
            <p className="manage-category-title">{cat}</p>
            <div className="manage-grid">
              {items.filter((item) => item.category === cat).map((item) => (
                <div className="manage-item" key={item.id}>
                  <img src={item.imageUrl} alt={item.name} className="manage-image" />
                  <p className="manage-item-name">{item.name}</p>
                  {item.price && <p className="manage-item-price">{item.price}</p>}
                  <button className="manage-delete-btn" onClick={() => handleDelete(item.id)}>삭제</button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
};

export default MenuManage;