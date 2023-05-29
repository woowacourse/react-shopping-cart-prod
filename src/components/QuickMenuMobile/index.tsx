import { useQuickMenu } from '@Hooks/useQuickMenu';

import { SERVERS, SERVERS_NAMES } from '@Constants/servers';

import * as S from './style';

function QuickMenuMobile() {
  const { handleClick, server } = useQuickMenu();

  return (
    <S.Container>
      {SERVERS_NAMES.map((value) => (
        <S.OptionLayout key={value}>
          <S.Option onClick={handleClick(value)} avatar={SERVERS[value].avatar} />
          <S.ServerLabel isSelected={server === SERVERS[value].serverName}>{SERVERS[value].serverName}</S.ServerLabel>
        </S.OptionLayout>
      ))}
    </S.Container>
  );
}

export default QuickMenuMobile;
