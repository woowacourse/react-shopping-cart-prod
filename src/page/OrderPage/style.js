import styled from 'styled-components';
import {FlexColumn, FlexRow} from 'style/common';

const OrderPageLayout = styled(FlexColumn)`
  margin: 140px 10%;
`;

const HeaderSpan = styled.span`
  font-size: 32px;
  font-weight: 700;
  border-bottom: 4px solid #333333;
  text-align: center;
  padding-bottom: 20px;
  margin-bottom: 53px;
`;

const Line = styled.div`
  border-top: 1px solid ${({theme}) => theme.GRAY_700};
  margin-bottom: 20px;
`;

const ContentLayout = styled(FlexRow)``;

export {OrderPageLayout, HeaderSpan, Line, ContentLayout};
