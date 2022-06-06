import styled from 'styled-components';

import Button from 'component/common/Button';

const Layout = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: ${({theme}) => theme.GRAY_400};
`;

const LoginContainer = styled.div`
  margin: 200px auto 0;
  width: 600px;
  height: 442px;
  background-color: ${({theme}) => theme.WHITE};
`;

const Header = styled.header`
  font-size: 34px;
  font-weight: 700;
  margin-bottom: 51px;
  text-align: center;
  padding-top: 40px;
`;

const InputForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
`;

const ConfirmButton = styled(Button)`
  margin-top: 26px;
`;

const SignUpText = styled.div`
  font-size: 15px;
  width: 300px;
  margin-top: 10px;
`;

const LinkText = styled.span`
  font-size: 15px;
  color: ${({theme}) => theme.BLUE_300};
  margin-left: 10px;
`;

export {Layout, LoginContainer, Header, InputForm, ConfirmButton, SignUpText, LinkText};
