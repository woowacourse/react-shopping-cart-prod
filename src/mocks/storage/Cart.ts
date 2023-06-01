import { CartProduct, Product } from '../../types/product';
import mockProducts from '../data/products.json';

const KEY = 'MSW_CART_STEP2';

const products: Product[] = mockProducts;

const getList = (): CartProduct[] => {
  const storageData = localStorage.getItem(KEY);
  return storageData ? JSON.parse(storageData) : [];
};

const setItem = (productId: number, quantity: number) => {
  const cart = getList();

  const productIndexAtCart = cart.findIndex(({ id }) => Number(id) === productId);
  const productInfo = products.find(({ id }) => id === productId);

  if (!productInfo) return;

  if (productIndexAtCart < 0) {
    cart.push({
      id: productId.toString(),
      quantity,
      product: productInfo,
    });
  } else {
    cart[productIndexAtCart].quantity = quantity;
  }

  const newCart = cart
    .filter((item) => item.quantity > 0)
    .sort((one, another) => Number(one.id) - Number(another.id));

  localStorage.setItem(KEY, JSON.stringify(newCart));
};

const Cart = { getList, setItem };

export default Cart;
