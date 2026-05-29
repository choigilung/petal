import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../../firebase';
import { collection, getDocs, setDoc, doc } from 'firebase/firestore';
import './ImageManage.css';

interface SiteImage {
  id: string;
  key: string;
  imageUrl: string;
  label: string;
}

const IMAGE_KEYS = [
  { key: 'cafe-hero', label: '카페 히어로 사진' },
  { key: 'cafe-space', label: '카페 공간 사진' },
  { key: 'flower-hero', label: '플라워 히어로 사진' },
  { key: 'flower-space', label: '플라워 공간 사진' },
  { key: 'coffee-hero', label: '커피 히어로 사진' },
];

const ImageManage = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState<SiteImage[]>([]);
  const [loadingKey, setLoadingKey] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) navigate('/admin');
    });
    fetchImages();
    return () => unsubscribe();
  }, []);

  const fetchImages = async () => {
    const snapshot = await getDocs(collection(db, 'siteImages'));
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as SiteImage));
    setImages(data);
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

  const handleUpload = async (key: string, file: File) => {
    setLoadingKey(key);
    try {
      const imageUrl = await uploadToCloudinary(file);
      await setDoc(doc(db, 'siteImages', key), { key, imageUrl });
      fetchImages();
      alert('사진이 변경됐어요!');
    } catch (err) {
      alert('업로드 중 오류가 발생했습니다.');
    }
    setLoadingKey(null);
  };

  return (
    <main className="image-manage">
      <div className="manage-header">
        <button className="back-btn" onClick={() => navigate('/admin/dashboard')}>← 대시보드</button>
        <h1 className="manage-title">사진 관리</h1>
      </div>

      <section className="manage-list">
        <div className="image-manage-grid">
          {IMAGE_KEYS.map(({ key, label }) => {
            const current = images.find((img) => img.key === key);
            return (
              <div className="image-manage-item" key={key}>
                <p className="manage-label">{label}</p>
                {current ? (
                  <img src={current.imageUrl} alt={label} className="image-manage-preview" />
                ) : (
                  <div className="image-manage-placeholder" />
                )}
                <label className="image-manage-upload-btn">
                  {loadingKey === key ? '업로드 중...' : '사진 변경'}
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleUpload(key, file);
                    }}
                  />
                </label>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
};

export default ImageManage;