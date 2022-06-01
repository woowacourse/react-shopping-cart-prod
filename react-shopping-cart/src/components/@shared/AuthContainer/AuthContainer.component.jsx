import styled from 'styled-components';

import FlexBox from 'components/@shared/FlexBox/FlexBox.component';

const AuthWrapper = styled(FlexBox).attrs(props => ({
  justifyContent: 'center',
  alignItems: 'center',
}))`
  min-height: 100vh;
`;

const AuthBox = styled.div`
  width: 475px;
  height: 580px;
  border: 2px solid #ebeef2;
  border-radius: 10px;
  margin: auto;
  padding: 50px;
`;

function AuthContainer({ children }) {
  return (
    <AuthWrapper>
      <AuthBox>{children}</AuthBox>
    </AuthWrapper>
  );
}

export default AuthContainer;
