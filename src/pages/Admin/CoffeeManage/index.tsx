import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../../firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, setDoc } from 'firebase/firestore';
import './CoffeeManage.css';

interface BeanItem {
  id: string;
  name: string;
  region: string;
  flavor: string;
  imageUrl: string;
}

interface MonthlyItem {
  id: string;
  name: string;
  description: string;
  flavor: string;
  imageUrl: string;
}

const CoffeeManage = () => {
  const navigate = useNavigate();
  const [beans, setBeans] = useState<BeanItem[]>([]);
  const [monthly, setMonthly] = useState<MonthlyItem | null>(null);

  const [beanName, setBeanName] = useState('');
  const [beanRegion, setBeanRegion] = useState('');
  const [beanFlavor, setBeanFlavor] = useState('');
  const [beanImage, setBeanImage] = useState<File | null>(null);
  const [beanLoading, setBeanLoading] = useState(false);

  const [monthlyName, setMonthlyName] = useState('');
  const [monthlyDesc, setMonthlyDesc] = useState('');
  const [monthlyFlavor, setMonthlyFlavor] = useState('');
  const [monthlyImage, setMonthlyImage] = useState<File | null>(null);
  const [monthlyLoading, setMonthlyLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) navigate('/admin');
    });
    fetchBeans();
    fetchMonthly();
    return () => unsubscribe();
  }, []);

  const fetchBeans = async () => {
    const snapshot = await getDocs(collection(db, 'beans'));
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as BeanItem));
    setBeans(data);
  };

  const fetchMonthly = async () => {
    const snapshot = await getDocs(collection(db, 'monthly'));
    if (!snapshot.empty) {
      const data = { id: snapshot.docs[0].id, ...snapshot.docs[0].data() } as MonthlyItem;
      setMonthly(data);
      setMonthlyName(data.name);
      setMonthlyDesc(data.description);
      setMonthlyFlavor(data.flavor);
    }
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

  const handleAddBean = async () => {
    if (!beanName) return alert('이름을 입력해 주세요.');
    if (!beanImage) return alert('사진을 선택해 주세요.');
    setBeanLoading(true);
    try {
      const imageUrl = await uploadToCloudinary(beanImage);
      await addDoc(collection(db, 'beans'), { name: beanName, region: beanRegion, flavor: beanFlavor, imageUrl });
      setBeanName('');
      setBeanRegion('');
      setBeanFlavor('');
      setBeanImage(null);
      fetchBeans();
    } catch (err) {
      alert('추가 중 오류가 발생했습니다.');
    }
    setBeanLoading(false);
  };

  const handleDeleteBean = async (id: string) => {
    if (!window.confirm('삭제하시겠습니까?')) return;
    await deleteDoc(doc(db, 'beans', id));
    fetchBeans();
  };

  const handleSaveMonthly = async () => {
    if (!monthlyName) return alert('이름을 입력해 주세요.');
    setMonthlyLoading(true);
    try {
      let imageUrl = monthly?.imageUrl || '';
      if (monthlyImage) {
        imageUrl = await uploadToCloudinary(monthlyImage);
      }
      if (monthly) {
        await setDoc(doc(db, 'monthly', monthly.id), { name: monthlyName, description: monthlyDesc, flavor: monthlyFlavor, imageUrl });
      } else {
        await addDoc(collection(db, 'monthly'), { name: monthlyName, description: monthlyDesc, flavor: monthlyFlavor, imageUrl });
      }
      fetchMonthly();
      setMonthlyImage(null);
      alert('저장되었습니다!');
    } catch (err) {
      alert('저장 중 오류가 발생했습니다.');
    }
    setMonthlyLoading(false);
  };

  return (
    <main className="coffee-manage">
      <div className="manage-header">
        <button className="back-btn" onClick={() => navigate('/admin/dashboard')}>← 대시보드</button>
        <h1 className="manage-title">커피 관리</h1>
      </div>

      {/* 이달의 커피 */}
      <section className="manage-form">
        <h2 className="manage-form-title">이달의 커피</h2>
        <div className="manage-form-grid">
          <div className="manage-form-group">
            <label className="manage-label">커피 이름</label>
            <input className="manage-input" type="text" value={monthlyName} onChange={(e) => setMonthlyName(e.target.value)} placeholder="예: Ethiopia Yirgacheffe" />
          </div>
          <div className="manage-form-group">
            <label className="manage-label">플레이버</label>
            <input className="manage-input" type="text" value={monthlyFlavor} onChange={(e) => setMonthlyFlavor(e.target.value)} placeholder="예: 플로럴 · 베리 · 밝은 산미" />
          </div>
          <div className="manage-form-group">
            <label className="manage-label">사진</label>
            <input className="manage-input" type="file" accept="image/*" onChange={(e) => setMonthlyImage(e.target.files?.[0] || null)} />
          </div>
          <div className="manage-form-group" style={{ gridColumn: '1 / -1' }}>
            <label className="manage-label">설명</label>
            <textarea className="manage-textarea" value={monthlyDesc} onChange={(e) => setMonthlyDesc(e.target.value)} placeholder="이달의 커피 설명 입력" rows={3} />
          </div>
        </div>
        <button className="manage-add-btn" onClick={handleSaveMonthly} disabled={monthlyLoading}>
          {monthlyLoading ? '저장 중...' : '저장하기'}
        </button>
      </section>

      {/* 원두 추가 */}
      <section className="manage-form">
        <h2 className="manage-form-title">원두 추가</h2>
        <div className="manage-form-grid">
          <div className="manage-form-group">
            <label className="manage-label">원두 이름</label>
            <input className="manage-input" type="text" value={beanName} onChange={(e) => setBeanName(e.target.value)} placeholder="예: Ethiopia" />
          </div>
          <div className="manage-form-group">
            <label className="manage-label">지역</label>
            <input className="manage-input" type="text" value={beanRegion} onChange={(e) => setBeanRegion(e.target.value)} placeholder="예: Yirgacheffe" />
          </div>
          <div className="manage-form-group">
            <label className="manage-label">플레이버</label>
            <input className="manage-input" type="text" value={beanFlavor} onChange={(e) => setBeanFlavor(e.target.value)} placeholder="예: 플로럴 · 베리" />
          </div>
          <div className="manage-form-group">
            <label className="manage-label">사진</label>
            <input
              className="manage-input"
              type="file"
              accept="image/*"
              onChange={(e) => {
                setBeanImage(e.target.files?.[0] || null);
                e.target.value = '';
              }}
            />
          </div>
        </div>
        <button className="manage-add-btn" onClick={handleAddBean} disabled={beanLoading}>
          {beanLoading ? '추가 중...' : '추가하기'}
        </button>
      </section>

      {/* 원두 목록 */}
      <section className="manage-list">
        <h2 className="manage-form-title">원두 목록</h2>
        <div className="manage-grid">
          {beans.length === 0 && <p className="empty-text">등록된 원두가 없어요.</p>}
          {beans.map((bean) => (
            <div className="manage-item" key={bean.id}>
              <img src={bean.imageUrl} alt={bean.name} className="manage-image" />
              <p className="manage-item-name">{bean.name}</p>
              <p className="manage-item-price">{bean.region}</p>
              <button className="manage-delete-btn" onClick={() => handleDeleteBean(bean.id)}>삭제</button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default CoffeeManage;