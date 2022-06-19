import styled from 'styled-components';
import {FlexRow} from 'style/common';

const OrderItemLayout = styled(FlexRow)`
  display: flex;
  gap: 15px;
  width: 100%;
`;

const ItemNameParagraph = styled.p`
  width: 100%;
`;

const ItemQuantityParagraph = styled.p`
  width: 100%;
`;

export {OrderItemLayout, ItemNameParagraph, ItemQuantityParagraph};
