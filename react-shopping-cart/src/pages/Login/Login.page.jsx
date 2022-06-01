import { Link } from 'react-router-dom';
import styled from 'styled-components';

import AuthContainer from 'components/@shared/AuthContainer/AuthContainer.component';
import Button from 'components/@shared/Button/Button.component';
import FlexBox from 'components/@shared/FlexBox/FlexBox.component';
import Input from 'components/@shared/Input/Input.component';
import TextBox from 'components/@shared/TextBox/TextBox.component';

import { ReactComponent as ShoppingCart } from 'assets/images/shoppingCart.svg';

const TitleBox = styled(FlexBox).attrs({
  alignItems: 'flex-end',
  justifyContent: 'center',
  gap: '10px',
})`
  margin: 15px 0;
`;

const CopyrightBox = styled(FlexBox).attrs({
  justifyContent: 'center',
})`
  margin: 30px 0;
`;

const SignupLink = styled(Link)`
  color: #777777;
  font-size: 14px;
  margin: 12px 0;
`;

function Login() {
  return (
    <AuthContainer>
      <FlexBox height="100%" direction="column" justifyContent="flex-end" gap="25px">
        <Link to="/">
          <TitleBox>
            <ShoppingCart fill="#2acabc" width={40} height={35} />
            <TextBox bold color="MINT_001" fontSize="large">
              WOOWA SHOP
            </TextBox>
          </TitleBox>
        </Link>
        <FlexBox width="100%" direction="column" gap="20px" alignItems="flex-end">
          <Input type="email" placeholder="이메일" />
          <Input type="password" placeholder="비밀번호" />
          <SignupLink to="/">회원가입</SignupLink>
          <Button width="100%" borderRadius="10px">
            <TextBox color="WHITE_001">로그인</TextBox>
          </Button>
        </FlexBox>
        <CopyrightBox>
          <TextBox fontSize="extraSmall">©️ WOOWA Shop Corp.</TextBox>
        </CopyrightBox>
      </FlexBox>
    </AuthContainer>
  );
}

export default Login;
