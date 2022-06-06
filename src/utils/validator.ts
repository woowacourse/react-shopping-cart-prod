import { CartStoreState, Product } from 'types/index';

const getProductStockInCart = (
  productId: Product['id'],
  cart: CartStoreState['cart']
) => {
  const product = cart.find(product => product.id === productId);

  if (!product) return 0;

  return product.stock;
};

const isValidPasswordLength = (password: string) => {
  return password.length >= 8 && password.length <= 16;
};

const isValidPasswordAllCharacters = (password: string) => {
  return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]/.test(
    password
  );
};

export {
  getProductStockInCart,
  isValidPasswordLength,
  isValidPasswordAllCharacters,
};
