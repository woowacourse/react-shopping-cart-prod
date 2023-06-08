import { useState } from 'react';
import { useRecoilState } from 'recoil';

import { Servers } from '@Types/index';

import useServer from '@Hooks/useServer';

import serverState from '@Atoms/serverState';

import { SERVERS, SERVERS_NAMES } from '@Constants/servers';

import * as S from './style';

function QuickMenu() {
  const { changeServer } = useServer();
  const [server, setServer] = useRecoilState(serverState);

  const [isHover, setIsHover] = useState(false);
  const [isInit, setIsInit] = useState(true);

  const switchServer = (value: Servers) => {
    if (value === server) return;

    setServer(value);
    changeServer(value);
  };

  return (
    <S.Container>
      <S.Button
        onMouseEnter={() => {
          setIsInit(false);
          setIsHover(true);
        }}
        onMouseLeave={() => {
          setIsHover(false);
        }}
      >
        {SERVERS_NAMES.map((value, index) => (
          <S.Option
            isHover={isHover}
            key={value}
            onClick={() => {
              switchServer(value);
            }}
            position={{ bottom: `${(index + 1) * 60}px` }}
            avatar={SERVERS[value].avatar}
            isInit={isInit}
          />
        ))}
      </S.Button>
    </S.Container>
  );
}

export default QuickMenu;
