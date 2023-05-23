import { useRecoilValue } from 'recoil';

import { cartProductCountState } from '../states/cartProducts';
import { serverNameState } from '../states/serverName';

const useCartProductCount = () => {
  const serverName = useRecoilValue(serverNameState);
  const cartProductCount = useRecoilValue(cartProductCountState(serverName));

  return cartProductCount;
};

export default useCartProductCount;
