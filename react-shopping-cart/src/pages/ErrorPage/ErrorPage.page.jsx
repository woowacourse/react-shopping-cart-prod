import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Error from 'components/@shared/Error/Error.component';
import FlexBox from 'components/@shared/FlexBox/FlexBox.component';
import PageContainer from 'components/@shared/PageContainer/PageContainer.component';

function ErrorPage({ children }) {
  return (
    <PageContainer>
      <FlexBox direction="column" gap="50px" justifyContent="center">
        <Error>{children}</Error>
        <HomeLink to="/">홈으로</HomeLink>
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
