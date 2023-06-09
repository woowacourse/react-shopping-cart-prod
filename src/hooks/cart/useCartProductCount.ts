import { useRecoilValue } from 'recoil';

import { cartProductCountSelector } from '../../states/cartProducts';

export const useCartProductCount = () => {
  const cartProductCount = useRecoilValue(cartProductCountSelector);

  return cartProductCount;
};
