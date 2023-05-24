import { SERVERS } from '@Constants/index';

import * as S from './style';

function QuickMenu() {
  return (
    <S.Container>
      <S.Button>
        <S.Option position={{ bottom: '60px' }} avatar={SERVERS.베베.avatar} />
        <S.Option position={{ bottom: '120px' }} avatar={SERVERS.에단.avatar} />
      </S.Button>
    </S.Container>
  );
}

export default QuickMenu;
