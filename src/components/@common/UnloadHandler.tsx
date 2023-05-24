import { useRecoilValue } from 'recoil';
import { cartListAtom } from '../../stores/cartListStore.ts';
import { useEffect } from 'react';
import { setCartListInLocalStorage, getCartListFromLocalStorage } from '../../utils/localStorageCartList.ts';
import deepEqual from '../../utils/deepEqual.ts';

const UnloadHandler = () => {
  const cartList = useRecoilValue(cartListAtom);

  useEffect(() => {
    const localStorageCartList = getCartListFromLocalStorage();

    if (deepEqual(cartList, localStorageCartList)) return;

    const handleUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();

      if (!cartList) return;

      setCartListInLocalStorage(cartList);
    };

    window.addEventListener('beforeunload', handleUnload);

    return () => {
      window.removeEventListener('beforeunload', handleUnload);
    };
  }, [cartList]);

  return null;
};

export default UnloadHandler;
