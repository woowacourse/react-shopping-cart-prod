import styled from 'styled-components';

import FlexBox from 'components/@shared/FlexBox/FlexBox.component';

const AuthWrapper = styled(FlexBox).attrs({
  justifyContent: 'center',
  alignItems: 'center',
})`
  min-height: 100vh;
`;

const AuthBox = styled.div`
  width: 475px;
  height: 620px;
  border: 2px solid ${({ theme }) => theme.colors['GRAY_001']};
  border-radius: 10px;
  margin: auto;
  padding: 30px 50px;
`;

function AuthContainer({ children }) {
  return (
    <AuthWrapper>
      <AuthBox>{children}</AuthBox>
    </AuthWrapper>
  );
}

export default AuthContainer;
