import { useRecoilValue } from 'recoil';

import { cartProductCountState } from '../../states/cartProducts';

export const useCartProductCount = () => {
  const cartProductCount = useRecoilValue(cartProductCountState);

  return cartProductCount;
};
