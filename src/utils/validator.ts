import { CartStoreState, Product } from 'types/index';

const getProductQuantityInCart = (
  productId: Product['id'],
  cart: CartStoreState['cart']
) => {
  const product = cart.find(item => item.product.id === productId);

  if (!product) return 0;

  return product.quantity;
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
  getProductQuantityInCart,
  isValidPasswordLength,
  isValidPasswordAllCharacters,
};
