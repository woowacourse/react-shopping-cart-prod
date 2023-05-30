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
    const { getCartProducts } = cartProductApis(serverName);

    const fetch = async () => {
      try {
        const cartProducts = await getCartProducts();
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
