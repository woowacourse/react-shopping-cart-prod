import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Error from 'components/@shared/Error/Error.component';
import FlexBox from 'components/@shared/FlexBox/FlexBox.component';
import PageContainer from 'components/@shared/PageContainer/PageContainer.component';

const errorResponse = {
  0: {
    message: '서버 오류입니다. 잠시 후 다시 시도해 주세요.',
    redirectMessage: '홈으로',
    redirectTo: '/',
  },
  401: {
    message: '다시 로그인 해 주세요.',
    redirectMessage: '로그인',
    redirectTo: '/login',
  },
};

function ErrorPage() {
  const { status } = useSelector(state => state.error);
  const { message, redirectMessage, redirectTo } = errorResponse[status];

  return (
    <PageContainer>
      <FlexBox direction="column" gap="50px" justifyContent="center">
        <Error>{message}</Error>
        <HomeLink reloadDocument to={redirectTo}>
          {redirectMessage}
        </HomeLink>
      </FlexBox>
    </PageContainer>
  );
}

export default ErrorPage;

const HomeLink = styled(Link)`
  display: flex;
  justify-content: center;
  font-weight: 900;
  font-size: 5em;
`;
