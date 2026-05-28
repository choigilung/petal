import MenuDetail from '../MenuDetail';

const Drip = () => {
  const items = [
    { name: 'Ethiopia Yirgacheffe', description: '플로럴한 향과 밝은 산미가 특징인 에티오피아 원두', price: '6,500원' },
    { name: 'Colombia Huila', description: '달콤한 캐러멜과 견과류의 고소함이 느껴지는 콜롬비아 원두', price: '6,500원' },
    { name: 'Guatemala Antigua', description: '다크초콜릿과 스모키한 풍미의 과테말라 원두', price: '6,000원' },
  ];

  return <MenuDetail category="DRIP" items={items} />;
};

export default Drip;