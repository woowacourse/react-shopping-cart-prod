import { useSetRecoilState } from 'recoil';

import serverState from '@Atoms/serverState';

import { SERVERS, SERVERS_NAMES } from '@Constants/servers';

import * as S from './style';

function QuickMenu() {
  const setServerState = useSetRecoilState(serverState);

  return (
    <S.Container>
      <S.Button>
        {SERVERS_NAMES.map((value, index) => (
          <S.Option
            key={value}
            onClick={() => setServerState(value)}
            position={{ bottom: `${(index + 1) * 60}px` }}
            avatar={SERVERS[value].avatar}
          />
        ))}
      </S.Button>
    </S.Container>
  );
}

export default QuickMenu;
