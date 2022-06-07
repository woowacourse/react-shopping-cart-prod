import {FlexColumn, FlexRow, Font} from 'style/common';
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

const ProductListContainer = styled(FlexColumn)`
  align-items: flex-end;
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

const PayBox = styled(FlexColumn)`
  width: 495px;
  justify-content: center;

  font-weight: 700;
  font-size: 28px;
  line-height: 28px;
  letter-spacing: 0.5px;

  .pay-box-hr {
    width: 100%;
  }
`;

const PayAmount = styled(FlexRow)`
  margin-top: 70px;
  justify-content: space-between;
`;

const PayBoxFont = styled(Font)`
  font-size: 20px;
  font-weight: 700;
  font-family: 'Lato';

  background-size: 0% 50%;
  background: ${({theme}) => `linear-gradient(to top, ${theme.MINT_500} 50%, transparent 50%)`};
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
  PayBox,
  PayAmount,
  PayBoxFont,
};
