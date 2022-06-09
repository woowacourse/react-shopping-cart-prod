import { CartStoreState, Product } from 'types/index';

const isProductInCart = (
  productId: Product['id'],
  cartItems: CartStoreState['cartItems']
) => {
  return cartItems.some((cartItem) => cartItem.product.id === productId);
};

const isValidPasswordLength = (password: string) => {
  return password.length >= 8 && password.length <= 16;
};

const isValidPasswordAllCharacters = (password: string) => {
  return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]/.test(
    password
  );
};

export { isProductInCart, isValidPasswordLength, isValidPasswordAllCharacters };
