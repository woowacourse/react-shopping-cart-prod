import { useRecoilValue, useSetRecoilState } from 'recoil';

import cartProductApis from '../apis/cartProducts';
import { cartProductState } from '../states/cartProducts';
import { updateTargetQuantity } from '../states/cartProducts/util';
import { serverNameState } from '../states/serverName';

const useProductQuantity = (id: number, quantity: number) => {
  const serverName = useRecoilValue(serverNameState);
  const setCartProducts = useSetRecoilState(cartProductState(serverName));

  const { patchData } = cartProductApis(serverName, '/cart-items');

  const addCount = () => {
    try {
      patchData(id, quantity + 1);
      setCartProducts((prev) => updateTargetQuantity(prev, id, quantity + 1));
    } catch (error) {
      // 에러 처리
    }
  };

  const subtractCount = () => {
    try {
      patchData(id, quantity - 1);
      setCartProducts((prev) => updateTargetQuantity(prev, id, quantity - 1));
    } catch (error) {
      // 에러 처리
    }
  };

  return { addCount, subtractCount };
};

export default useProductQuantity;
