import { useSetRecoilState } from 'recoil';

import serverState from '@Atoms/serverState';

import { SERVERS } from '@Constants/index';

import * as S from './style';

function QuickMenu() {
  const setServerState = useSetRecoilState(serverState);

  return (
    <S.Container>
      <S.Button>
        <S.Option onClick={() => setServerState('베베')} position={{ bottom: '60px' }} avatar={SERVERS.베베.avatar} />
        <S.Option onClick={() => setServerState('에단')} position={{ bottom: '120px' }} avatar={SERVERS.에단.avatar} />
        <S.Option
          onClick={() => setServerState('도리와 노아')}
          position={{ bottom: '180px' }}
          avatar={SERVERS['도리와 노아'].avatar}
        />
      </S.Button>
    </S.Container>
  );
}

export default QuickMenu;
