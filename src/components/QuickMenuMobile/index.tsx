import { useRecoilValue } from 'recoil';

import { useQuickMenu } from '@Hooks/useQuickMenu';

import serverState from '@Atoms/serverState';

import { SERVERS, SERVERS_NAMES } from '@Constants/servers';

import * as S from './style';

function QuickMenuMobile() {
  const server = useRecoilValue(serverState);
  const { makeHandleClickFromServer } = useQuickMenu();

  return (
    <S.Container>
      {SERVERS_NAMES.map((value) => (
        <S.OptionLayout key={value}>
          <S.Option onClick={makeHandleClickFromServer(value)} avatar={SERVERS[value].avatar} />
          <S.ServerLabel isSelected={server === SERVERS[value].serverName}>{SERVERS[value].serverName}</S.ServerLabel>
        </S.OptionLayout>
      ))}
    </S.Container>
  );
}

export default QuickMenuMobile;
