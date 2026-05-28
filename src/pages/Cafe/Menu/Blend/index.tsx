import MenuDetail from '../MenuDetail';

const Blend = () => {
  const items = [
    { name: 'House Blend', description: '페탈 옹트라쎄의 시그니처 블렌드. 부드럽고 균형잡힌 맛', price: '5,500원' },
    { name: 'Seasonal Blend', description: '계절마다 바뀌는 스페셜 블렌드', price: '6,000원' },
  ];

  return <MenuDetail category="BLEND" items={items} />;
};

export default Blend;