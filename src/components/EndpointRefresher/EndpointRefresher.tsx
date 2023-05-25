import { PropsWithChildren, useEffect } from 'react';
import { useRecoilRefresher_UNSTABLE, useRecoilValue } from 'recoil';
import { authFetchQuery, fetchQuery } from '../../apis/api';
import { cartState, endpointKeyState } from '../../atoms/cart';
import { products } from '../../atoms/products';
import { ENDPOINT } from '../../constants/auth';

const EndpointRefresher = ({ children }: PropsWithChildren) => {
  const endpointKey = useRecoilValue(endpointKeyState);
  const refreshCart = useRecoilRefresher_UNSTABLE(cartState);
  const refreshProducts = useRecoilRefresher_UNSTABLE(products);

  useEffect(() => {
    fetchQuery.updateDefaultConfig({ baseURL: ENDPOINT[endpointKey] });
    authFetchQuery.updateDefaultConfig({ baseURL: ENDPOINT[endpointKey] });
    refreshCart();
    refreshProducts();
  }, [endpointKey]);

  return <>{children}</>;
};

export default EndpointRefresher;
