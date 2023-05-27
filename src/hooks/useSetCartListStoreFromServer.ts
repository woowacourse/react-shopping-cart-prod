import { useSetRecoilState } from 'recoil';
import { cartListAtom } from '../stores/cartListStore.ts';
import { CartList, CartListWithSelected } from '../types/CartList.ts';

const useSetCartListStoreFromServer = () => {
  const setCartListStore = useSetRecoilState(cartListAtom);

  const setCartListStoreFromServer = (cartList: CartList) => {
    const processedCartList: CartListWithSelected = cartList.map((item) => {
      return {
        ...item,
        isSelected: true,
      };
    });

    setCartListStore(processedCartList);
  };

  return { setCartListStoreFromServer };
};

export default useSetCartListStoreFromServer;
