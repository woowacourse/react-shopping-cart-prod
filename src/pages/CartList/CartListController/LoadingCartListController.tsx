import Checkbox from '@Components/Checkbox';
import SecondaryButton from '@Components/SecondaryButton';

import * as S from './style';

function LoadingCartListController() {
  return (
    <S.Container>
      <Checkbox size="small" />
      <S.SelectedSituation>전체해제(0/0)</S.SelectedSituation>
      <SecondaryButton text="선택삭제" />
    </S.Container>
  );
}

export default LoadingCartListController;
