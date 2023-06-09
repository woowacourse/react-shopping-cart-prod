/* eslint-disable react-hooks/exhaustive-deps */
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import * as S from './ServerSelectBox.style';
import { serverState } from '../../../../recoil/serverAtom';
import { ChangeEvent, useEffect } from 'react';
import { fetchCartList } from '../../../../api/api';
import { cartState } from '../../../../recoil/cartAtoms';
import { memberAuthorization } from '../../../../recoil/userAtoms';

function ServerSelectBox() {
  const [server, setServer] = useRecoilState(serverState);
  const memberAuth = useRecoilValue(memberAuthorization);

  const onChangeServer = (e: ChangeEvent<HTMLSelectElement>) => {
    setServer(e.target.value);
  };

  const setCartList = useSetRecoilState(cartState);

  const loadCartList = async () => {
    const checkedCartItems = await fetchCartList(server, memberAuth);
    setCartList(checkedCartItems.cartItems);
  };

  useEffect(() => {
    loadCartList();
  }, [server, memberAuth]);

  return (
    <S.Select value={server} onChange={onChangeServer}>
      <option>테스트</option>
      <option>디노</option>
      <option>레오</option>
      <option>비버</option>
    </S.Select>
  );
}

export default ServerSelectBox;
