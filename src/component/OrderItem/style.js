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

const Layout = styled(FlexRow)`
  align-items: center;
  gap: 18px;
`;

export {ProductImage, ProductName, ProductQuantity, ContentRow, Layout};
