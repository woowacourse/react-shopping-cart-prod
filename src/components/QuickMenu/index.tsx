import { useState } from 'react';
import { useSetRecoilState } from 'recoil';

import serverState from '@Atoms/serverState';

import { SERVERS, SERVERS_NAMES } from '@Constants/servers';

import * as S from './style';

function QuickMenu() {
  const setServerState = useSetRecoilState(serverState);
  const [hover, setHover] = useState(false);

  return (
    <S.Container>
      <S.Button onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
        {SERVERS_NAMES.map((value, index) => (
          <S.Option
            hover={hover}
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
