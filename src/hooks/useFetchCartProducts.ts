import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { cartProductState } from '../states/cartProducts';
import { useEffect } from 'react';
import { serverNameState } from '../states/serverName';
import cartProductApis from '../apis/cartProducts';

const useFetchCartProducts = () => {
  const serverName = useRecoilValue(serverNameState);

  const setCartProducts = useSetRecoilState(cartProductState);
  const resetCartProducts = useResetRecoilState(cartProductState);

  useEffect(() => {
    const { getData } = cartProductApis(serverName, '/cart-items');

    const fetch = async () => {
      try {
        const cartProducts = await getData();
        setCartProducts(cartProducts);
      } catch {
        resetCartProducts();
      }
    };

    fetch();
  }, [resetCartProducts, serverName, setCartProducts]);

  return serverName;
};

export default useFetchCartProducts;
