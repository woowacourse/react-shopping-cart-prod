import { PropsWithChildren, useEffect } from 'react';
import { useRecoilRefresher_UNSTABLE, useRecoilValue } from 'recoil';
import { authFetchQuery, fetchQuery } from '../../apis/api';
import { cartState } from '../../atoms/cart';
import { endpointKeyState } from '../../atoms/endpoint';
import { productsSelector } from '../../atoms/products';
import { ENDPOINT } from '../../constants/auth';

const EndpointRefresher = ({ children }: PropsWithChildren) => {
  const endpointKey = useRecoilValue(endpointKeyState);
  const refreshCart = useRecoilRefresher_UNSTABLE(cartState);
  const refreshProducts = useRecoilRefresher_UNSTABLE(productsSelector);

  useEffect(() => {
    fetchQuery.updateDefaultConfig({ baseURL: ENDPOINT[endpointKey] });
    authFetchQuery.updateDefaultConfig({ baseURL: ENDPOINT[endpointKey] });
    refreshCart();
    refreshProducts();
  }, [endpointKey]);

  return <>{children}</>;
};

export default EndpointRefresher;
