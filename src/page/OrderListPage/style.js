import {FlexColumn, FlexRow} from 'style/common';
import styled from 'styled-components';

const Layout = styled(FlexColumn)`
  margin: 140px 10%;
  justify-content: center;
  align-items: center;
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

  width: 1320px;
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

const OrderItemContainer = styled.div`
  display: table-row;
  border: 1px solid ${({theme}) => theme.GRAY_700};
`;

const OrderTable = styled.div`
  width: 1320px;
  height: 220px;

  display: table;

  border: 1px solid ${({theme}) => theme.GRAY_700};
  border-collapse: collapse;

  box-sizing: border-box;

  margin-bottom: 74px;

  padding: 20px;
`;

const OrderNumber = styled.div`
  height: 92px;

  font-size: 20px;
  padding: 0 20px;
  line-height: 92px;
  letter-spacing: 0.5px;
`;

const OrderTableHeader = styled(FlexRow)`
  width: 1320px;
  justify-content: space-between;
  align-items: center;
  background-color: ${({theme}) => theme.GRAY_400};
`;

const OrderItemBox = styled.div`
  padding: 20px;
`;

export {
  Layout,
  ProductTable,
  HeaderSpan,
  ListHeaderSpan,
  ProductListContainer,
  ProductInfoContainer,
  OrderItemContainer,
  OrderTable,
  OrderNumber,
  OrderTableHeader,
  OrderItemBox,
};
