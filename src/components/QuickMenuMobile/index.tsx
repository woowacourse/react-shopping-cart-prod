import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import { Servers } from '@Types/index';

import useCartItems from '@Hooks/useCartItems';

import serverState from '@Atoms/serverState';

import { SERVERS, SERVERS_NAMES } from '@Constants/servers';

import * as S from './style';

function QuickMenuMobile() {
  const navigate = useNavigate();
  const { toggleServer } = useCartItems();
  const [server, setServer] = useRecoilState(serverState);

  const switchServer = (value: Servers) => {
    if (value === server) return;

    setServer(value);
    toggleServer(value);
  };

  const moveOrderList = () => navigate('/order-list');

  return (
    <S.Container>
      {SERVERS_NAMES.map((value) => (
        <S.OptionLayout key={value}>
          <S.Option onClick={() => switchServer(value)} avatar={SERVERS[value].avatar} />
          <S.ServerLabel isSelected={server === SERVERS[value].serverName}>{SERVERS[value].serverName}</S.ServerLabel>
        </S.OptionLayout>
      ))}
      <S.OrderListLayout onClick={moveOrderList}>
        <S.OrderListIcon>🛍️</S.OrderListIcon>
        <S.OrderListLabel>주문목록</S.OrderListLabel>
      </S.OrderListLayout>
    </S.Container>
  );
}

export default QuickMenuMobile;
