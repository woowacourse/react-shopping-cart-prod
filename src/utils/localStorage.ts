import cart from '../mocks/data/cart.json';
import order from '../mocks/data/order.json';

export function updateData(key: string, data: unknown) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function getData(key: string) {
  const currentData = localStorage.getItem(key);
  if (currentData === '{}' || currentData === null) {
    const mockData = key === 'cart' ? cart : order;
    updateData(key, mockData);
    return mockData;
  }
  return JSON.parse(currentData);
}
