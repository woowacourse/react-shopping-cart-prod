import cart from '../mocks/data/cart.json';
import order from '../mocks/data/order.json';
import point from '../mocks/data/point.json';

export function updateData(key: string, data: unknown) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function getData(key: string) {
  const currentData = localStorage.getItem(key);
  if (currentData === '{}' || currentData === null) {
    const mockData = getDataByKey(key);
    updateData(key, mockData);
    return mockData;
  }
  return JSON.parse(currentData);
}

function getDataByKey(key: string) {
  switch (key) {
    case 'cart':
      return cart;
    case 'order':
      return order;
    case 'point':
      return point;
    default:
      return '';
  }
}
