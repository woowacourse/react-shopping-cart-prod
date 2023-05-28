import cartState from '@recoil/cart/cartState';
import { productListState } from '@recoil/product/productListState';
import { atom, useRecoilRefresher_UNSTABLE, useRecoilState, useResetRecoilState } from 'recoil';

export const SERVER_NAME = ['마코', '허브', '우가'] as const;

export const SERVER = {
  [SERVER_NAME[0]]: 'https://m4co.shop',
  [SERVER_NAME[1]]: 'https://h3rb.shop',
  [SERVER_NAME[2]]: 'https://wuga.shop',
} as const;

export type ServerName = keyof typeof SERVER;

const serverState = atom<ServerName>({
  key: 'serverState',
  default: SERVER_NAME[0],
});

export default serverState;

export const useServer = () => {
  const [server, setServer] = useRecoilState(serverState);

  const refreshServer = useRecoilRefresher_UNSTABLE(serverState);
  const refreshCart = useRecoilRefresher_UNSTABLE(cartState);
  const refreshProduct = useRecoilRefresher_UNSTABLE(productListState);

  const handleServer = (newServer: ServerName) => {
    setServer(newServer);
    refreshServer();
    refreshCart();
    refreshProduct();
  };

  return {
    server,
    handleServer,
  };
};
