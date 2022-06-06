import styled from 'styled-components';
import {FlexColumn, FlexRow} from 'style/common';
import Button from 'component/common/Button';

const Layout = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 1140px;
  background-color: ${({theme}) => theme.GRAY_400};
`;

const SignUpContainer = styled.div`
  margin: 200px auto 0;
  width: 600px;
  height: 820px;
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
  align-items: center;
  gap: 16px;
`;

const ConfirmButton = styled(Button)`
  margin-top: -5px;
  border-radius: 4px;
`;

const PasswordContainer = styled(FlexColumn)``;

const PhoneNumberContainer = styled(FlexRow)`
  width: 300px;
  align-items: flex-start;
  gap: 14px;
`;

const Hyphen = styled.span`
  color: ${({theme}) => theme.GRAY_650};
  height: 83px;
  line-height: 83px;
`;

export {
  Layout,
  SignUpContainer,
  Header,
  InputForm,
  ConfirmButton,
  PhoneNumberContainer,
  PasswordContainer,
  Hyphen,
};
