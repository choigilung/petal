import MenuDetail from '../MenuDetail';

const Dessert = () => {
  const items = [
    { name: 'Financier', description: '겉은 바삭하고 속은 촉촉한 피낭시에', price: '3,500원' },
    { name: 'Canelé', description: '카라멜향 가득한 프랑스 전통 디저트', price: '4,000원' },
    { name: 'Scone', description: '버터향 풍부한 플레인 스콘', price: '4,500원' },
  ];

  return <MenuDetail category="DESSERT" items={items} />;
};

export default Dessert;