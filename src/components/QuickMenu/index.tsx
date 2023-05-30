import { useState } from 'react';
import { useSetRecoilState } from 'recoil';

import useCartItems from '@Hooks/useCartItems';

import serverState from '@Atoms/serverState';

import { SERVERS, SERVERS_NAMES } from '@Constants/servers';

import * as S from './style';

function QuickMenu() {
  const { toggleServer } = useCartItems();
  const setServer = useSetRecoilState(serverState);

  const [isHover, setIsHover] = useState(false);
  const [isInit, setIsInit] = useState(true);

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
              setServer(value);
              toggleServer(value);
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
