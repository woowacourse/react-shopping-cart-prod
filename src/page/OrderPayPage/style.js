import {FlexColumn, FlexRow} from 'style/common';
import styled from 'styled-components';

const Layout = styled(FlexColumn)`
  margin: 140px 10%;
`;

const ProductTable = styled(FlexRow)`
  gap: 80px;
`;

const HeaderSpan = styled.span`
  font-size: 32px;
  font-weight: 700;
  border-bottom: 4px solid #333333;
  text-align: center;
  padding-bottom: 20px;
  margin-bottom: 53px;
`;

const ListHeaderSpan = styled.span`
  border-bottom: ${({theme}) => `4px solid ${theme.GRAY_700}`};
  padding-bottom: 16px;
  margin-bottom: 10px;
`;

const ProductListContainer = styled.div`
  width: 100%;
`;

const ProductInfoContainer = styled(FlexColumn)`
  width: 100%;
`;

export {
  Layout,
  ProductTable,
  HeaderSpan,
  ListHeaderSpan,
  ProductListContainer,
  ProductInfoContainer,
};
