import { useRecoilCallback, useRecoilValue } from 'recoil';
import { serverAtom } from 'recoil/server';
import { SERVERS } from 'utils/constants';
import { Server, ServerName } from 'types/server';
import * as S from './SelectServer.styles';
import { getCartList } from 'api/cart';
import { cartListAtom, checkedItemIdsAtom } from 'recoil/carts';
import { CartItem } from 'types/api/carts';

const SelectServer = () => {
  const server = useRecoilValue(serverAtom);

  const onChangeServer: React.ChangeEventHandler<HTMLSelectElement> =
    useRecoilCallback(
      ({ set }) =>
        async (event) => {
          const serverName = event.target.value as ServerName;
          const selectedServer = SERVERS[serverName] as Server;
          set(serverAtom, selectedServer);

          try {
            const cartList = await getCartList(selectedServer);
            set(cartListAtom, cartList);
            set(
              checkedItemIdsAtom,
              cartList.map((item: CartItem) => item.id)
            );
          } catch (error) {
            if (!(error instanceof Error)) return;
          }
        },
      []
    );

  return (
    <S.SelectBox onChange={onChangeServer}>
      <option value="여우" selected={server === SERVERS['여우']}>
        여우
      </option>
      <option value="프론트" selected={server === SERVERS['프론트']}>
        제이
      </option>
      <option value="루쿠" selected={server === SERVERS['루쿠']}>
        루쿠
      </option>
    </S.SelectBox>
  );
};

export default SelectServer;
