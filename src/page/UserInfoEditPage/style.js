import styled from 'styled-components';
import {FlexColumn, FlexRow} from 'style/common';
import Button from 'component/common/Button';

const Layout = styled.div`
  position: absolute;
  width: 100%;
  height: 1000px;
  background-color: ${({theme}) => theme.GRAY_400};
`;

const SignupContainer = styled.div`
  margin: 200px auto 0;
  width: 600px;
  height: 600px;
  background-color: ${({theme}) => theme.WHITE};
`;

const Header = styled.header`
  font-size: 34px;
  font-weight: 700;
  margin-bottom: 51px;
  text-align: center;
  padding-top: 40px;
`;

const InputCol = styled(FlexColumn)`
  gap: 16px;
  align-items: center;
`;

const ConfirmButton = styled(Button)`
  margin-top: 34px;
  border-radius: 4px;
`;

const PhoneNumberContainer = styled(FlexRow)`
  width: 300px;
  align-items: flex-end;
  gap: 14px;
`;

const Hyphen = styled.span`
  color: ${({theme}) => theme.GRAY_650};
  height: 36px;
  line-height: 36px;
`;

export {Layout, SignupContainer, Header, InputCol, ConfirmButton, PhoneNumberContainer, Hyphen};
