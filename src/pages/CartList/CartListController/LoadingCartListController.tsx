import Checkbox from '@Components/Checkbox';

import * as S from './style';

function LoadingCartListController() {
  return (
    <S.Container>
      <Checkbox isChecked={true} size="small" updateSelectedState={() => alert('?')} />
      <S.SelectedSituation>전체해제(0/0)</S.SelectedSituation>
      <S.DeleteButton>선택삭제</S.DeleteButton>
    </S.Container>
  );
}

export default LoadingCartListController;
