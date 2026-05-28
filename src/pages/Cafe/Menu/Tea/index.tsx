import MenuDetail from '../MenuDetail';

const Tea = () => {
  const items = [
    { name: 'Earl Grey', description: '베르가못 향이 가득한 클래식 얼그레이', price: '5,500원' },
    { name: 'Chamomile', description: '은은하고 부드러운 캐모마일 허브티', price: '5,500원' },
    { name: 'Peppermint', description: '청량하고 상쾌한 페퍼민트 티', price: '5,500원' },
  ];

  return <MenuDetail category="TEA" items={items} />;
};

export default Tea;