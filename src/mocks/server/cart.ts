import products from "mocks/mockData.json";

const LOCAL_STORAGE_KEY = "server";

type Cart = CartItem[];

interface CartItem {
  id: number;
  quantity: number;
  product: Product;
}

interface Product {
  id: number;
  price: number;
  name: string;
  imageUrl: string;
}

export const getCart = (): Cart => {
  try {
    const item = localStorage.getItem(LOCAL_STORAGE_KEY);

    return item ? JSON.parse(item) : [];
  } catch {
    return [];
  }
};

export const addCartItem = (id: number) => {
  const cart = getCart();
  const product = products.find((value) => value.id === id);

  if (!product) return;

  const cartItemId = Date.now();

  cart.push({ id: cartItemId, quantity: 1, product: product });

  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cart));

  return cartItemId;
};

export const setCartItem = (id: number, quantity: number) => {
  const cart = getCart();
  const itemIndex = cart.findIndex((item) => item.id === id);

  if (itemIndex === -1) return;

  if (quantity > 0) cart[itemIndex] = { ...cart[itemIndex], quantity: quantity };
  if (quantity === 0) cart.splice(itemIndex, 1);

  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cart));
};
