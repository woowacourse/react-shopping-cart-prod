import { Cart, CartStoreState, Product } from 'types/index';

const isProductInCart = (productId: number, cartItemList: Cart[]) => {
  return cartItemList.some(({ product }) => product.id === productId);
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
