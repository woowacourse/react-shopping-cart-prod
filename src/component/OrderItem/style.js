import Button from 'component/common/Button';
import {FlexColumn, FlexRow} from 'style/common';
import styled from 'styled-components';

const ProductImage = styled.img`
  width: 120px;
  height: 120px;
  background-color: red;
`;

const ProductName = styled.div`
  font-size: 20px;
  line-height: 21px;
  letter-spacing: 0.5px;
`;

const ProductQuantity = styled.div`
  font-size: 16px;
  line-height: 19px;
  letter-spacing: 0.5px;
`;

const ContentRow = styled(FlexColumn)`
  height: 120px;
  justify-content: space-around;
`;

const CartButton = styled(Button)`
  width: 138px;
  height: 50px;

  border-radius: 4px;
  background-color: ${({theme}) => theme.MINT_500};

  font-size: 20px;
  line-height: 20px;

  visibility: ${(props) => (props.showButton ? 'visible' : 'hidden')};
`;

const FlexRowContainer = styled(FlexRow)`
  gap: 18px;
`;

const Layout = styled(FlexRow)`
  align-items: center;
  justify-content: space-between;
`;

export {
  ProductImage,
  ProductName,
  ProductQuantity,
  ContentRow,
  Layout,
  CartButton,
  FlexRowContainer,
};
