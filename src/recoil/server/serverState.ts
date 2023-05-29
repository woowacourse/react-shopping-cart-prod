import { atom, useRecoilRefresher_UNSTABLE, useRecoilState } from 'recoil';
import cartState from '@recoil/cart/cartState';
import { productListState } from '@recoil/product/productListState';
import { SERVER_NAME, ServerName } from '@constants/serverUrlConstants';

const serverState = atom<ServerName>({
  key: 'serverState',
  default: SERVER_NAME[0],
});

export default serverState;
