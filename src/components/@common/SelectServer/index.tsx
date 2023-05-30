import { useRecoilCallback, useRecoilState, useRecoilValue } from 'recoil';
import { serverAtom } from 'recoil/server';
import { SERVERS } from 'utils/constants';
import { ServerName } from 'types';
import * as S from './SelectServer.styles';
import { getCartList } from 'api/requests';
import { cartListAtom } from 'recoil/cartList';

const SelectServer = () => {
  const server = useRecoilValue(serverAtom);

  const onChangeServer: React.ChangeEventHandler<HTMLSelectElement> =
    useRecoilCallback(
      ({ set }) =>
        async (event) => {
          const serverName = event.target.value as ServerName;
          set(serverAtom, SERVERS[serverName]);
          try {
            const cartList = await getCartList(SERVERS[serverName]);
            set(cartListAtom, cartList);
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
      <option value="제이" selected={server === SERVERS['제이']}>
        제이
      </option>
      <option value="루쿠" selected={server === SERVERS['루쿠']}>
        루쿠
      </option>
    </S.SelectBox>
  );
};

export default SelectServer;
