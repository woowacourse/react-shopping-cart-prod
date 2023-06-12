import { CartItemType } from 'types/ProductType';

const validateCart = (cart: CartItemType[], cartId: number) => {
  if (!cart.some((cartItem) => cartItem.id === cartId)) {
    throw new Error(
      '수량 변경하였지만 recoil에서 관리하는 cartState에서 cartItem의 id를 찾을 수 없습니다. '
    );
  }
};

export default validateCart;
