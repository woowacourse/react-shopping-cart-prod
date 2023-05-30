import Checkbox from '@Components/Checkbox';

import * as S from './style';

function LoadingCartListController() {
  return (
    <S.Container>
      <Checkbox size="small" />
      <S.SelectedSituation>전체해제(0/0)</S.SelectedSituation>
      <S.DeleteButton>선택삭제</S.DeleteButton>
    </S.Container>
  );
}

export default LoadingCartListController;
