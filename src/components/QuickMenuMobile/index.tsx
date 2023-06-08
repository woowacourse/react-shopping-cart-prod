import { useModal } from 'noah-modal';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import { Servers } from '@Types/index';

import useServer from '@Hooks/useServer';

import serverState from '@Atoms/serverState';

import ROUTES from '@Constants/routes';
import { SERVERS, SERVERS_NAMES } from '@Constants/servers';

import * as S from './style';

function QuickMenuMobile() {
  const navigate = useNavigate();
  const { changeServer } = useServer();
  const [server, setServer] = useRecoilState(serverState);
  const { isModalOpen } = useModal();

  const switchServer = (value: Servers) => {
    if (value === server) return;

    setServer(value);
    changeServer(value);
  };

  const moveOrderList = () => navigate(ROUTES.orderList);

  if (isModalOpen) return <div></div>;

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
