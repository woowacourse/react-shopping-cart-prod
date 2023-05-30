import { useRecoilState } from 'recoil';

import useCartItems from '@Hooks/useCartItems';

import serverState from '@Atoms/serverState';

import { SERVERS, SERVERS_NAMES } from '@Constants/servers';

import * as S from './style';

function QuickMenuMobile() {
  const { toggleServer } = useCartItems();
  const [server, setServer] = useRecoilState(serverState);

  return (
    <S.Container>
      {SERVERS_NAMES.map((value) => (
        <S.OptionLayout key={value}>
          <S.Option
            onClick={() => {
              setServer(value);
              toggleServer(value);
            }}
            avatar={SERVERS[value].avatar}
          />
          <S.ServerLabel isSelected={server === SERVERS[value].serverName}>{SERVERS[value].serverName}</S.ServerLabel>
        </S.OptionLayout>
      ))}
    </S.Container>
  );
}

export default QuickMenuMobile;
