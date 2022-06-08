import { Link, useLocation } from 'react-router-dom';

import { Button, StatusMessage } from 'components/@common';

import { ICON_CODE, PAGE_LIST } from 'constants/';

import * as S from './styles';

export function AccessDeniedPage() {
  const { state: pageState } = useLocation();

  return (
    <S.Container>
      <StatusMessage status="error">로그인이 필요한 페이지입니다.</StatusMessage>
      <S.ButtonContainer>
        <Link to={PAGE_LIST.LOGIN} state={pageState}>
          <Button type="button" status="primary" icon={ICON_CODE.USER} width="10rem">
            로그인
          </Button>
        </Link>

        <Link to={PAGE_LIST.HOME}>
          <Button type="button" icon={ICON_CODE.HOME} width="10rem">
            홈 화면으로
          </Button>
        </Link>
      </S.ButtonContainer>
    </S.Container>
  );
}
export default AccessDeniedPage;
