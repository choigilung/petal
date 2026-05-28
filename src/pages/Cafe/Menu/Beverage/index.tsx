import MenuDetail from '../MenuDetail';

const Beverage = () => {
  const items = [
    { name: 'Latte', description: '부드러운 우유거품과 에스프레소의 조화', price: '6,000원' },
    { name: 'Iced Americano', description: '깔끔하고 시원한 아이스 아메리카노', price: '5,000원' },
    { name: 'Flat White', description: '진한 에스프레소와 벨벳같은 우유의 조화', price: '6,500원' },
  ];

  return <MenuDetail category="BEVERAGE" items={items} />;
};

export default Beverage;