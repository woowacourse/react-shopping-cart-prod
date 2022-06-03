import Button from 'component/common/Button';
import Input from 'component/common/Input';
import {FlexColumn, FlexRow} from 'style/common';
import styled from 'styled-components';

const Layout = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;

  width: 100%;
  height: 1000px;

  background-color: ${({theme}) => theme.GRAY_400};
`;

const WithDrawalContainer = styled.div`
  margin: 200px auto 0;

  width: 600px;
  height: 675px;

  background-color: ${({theme}) => theme.WHITE};
`;

const HeaderRow = styled(FlexRow)`
  justify-content: center;
  align-items: center;

  gap: 20px;
`;

const Header = styled.header`
  height: 57px;
  line-height: 57px;
  font-size: 34px;
  font-weight: 700;
  margin-bottom: 51px;
  text-align: center;
  padding-top: 40px;
`;

const WithDrawalSection = styled(FlexColumn)`
  align-items: center;
  gap: 48px;
`;

const WithDrawalImage = styled.img`
  width: 57px;
  height: 57px;
  padding-bottom: 18px;
`;

const WithDrawalText = styled.div`
  max-width: 455px;
  line-height: 24px;
`;

const WithDrawalInput = styled(Input)`
  width: 456px;
  height: 50px;

  background-color: ${({theme}) => theme.WHITE};
  border-radius: 4px;
`;

const WithDrawalButton = styled(Button)`
  width: 456px;
  height: 50px;

  background-color: ${({theme}) => theme.RED_600};
  border-radius: 4px;

  font-size: 14px;
  margin-top: 48px;
`;

const TextWithCheckBox = styled(FlexRow)`
  justify-content: space-between;
  align-items: center;
`;

export {
  Layout,
  WithDrawalContainer,
  Header,
  WithDrawalText,
  WithDrawalImage,
  HeaderRow,
  WithDrawalButton,
  WithDrawalInput,
  WithDrawalSection,
  TextWithCheckBox,
};
