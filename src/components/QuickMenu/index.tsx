import { useState } from 'react';

import { useQuickMenu } from '@Hooks/useQuickMenu';

import { SERVERS, SERVERS_NAMES } from '@Constants/servers';

import * as S from './style';

function QuickMenu() {
  const { handleClick } = useQuickMenu();

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
            onClick={handleClick(value)}
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
