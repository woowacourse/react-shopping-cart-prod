import cart from '../mocks/data/cart.json';

export function updateData(key: string, data: unknown) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function getData(key: string) {
  const currentData = localStorage.getItem(key);
  if (currentData === '{}' || currentData === null) {
    updateData('cart', cart);
    return cart;
  }
  return JSON.parse(currentData);
}
