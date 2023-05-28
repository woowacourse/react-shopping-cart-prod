import styled from 'styled-components';

import { Button } from '../../common/Button/Button.styles';
import { Text } from '../../common/Text/Text.styles';

const OrderDetailItemContainer = styled.div`
  width: 960px;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacer.spacing4};
`;

const OrderDetailItemImage = styled.img`
  width: 100px;
  height: 100px;
  background-color: beige;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.borderRadius.small};
`;

const OrderDetailItemInformation = styled.div``;

const OrderDetailItemName = styled(Text)`
  font-weight: 600;
`;

const OrderDetailItemPriceContainer = styled.div`
  margin-top: ${({ theme }) => theme.spacer.spacing2};
  display: flex;
  align-items: center;
  letter-spacing: -0.3px;
`;

const OrderDetailItemConsumerPrice = styled(Text)`
  font-weight: 600;
`;

const VerticalLine = styled.div`
  height: 16px;
  margin-left: ${({ theme }) => theme.spacer.spacing3};
  border-left: 1px solid ${({ theme }) => theme.color.gray2};
`;

const OrderDetailItemOriginalPrice = styled(Text)`
  margin-left: ${({ theme }) => theme.spacer.spacing2};
  color: #b1b3b5;
  font-weight: normal;
  text-decoration: line-through;
`;

const OrderDetailItemQuantity = styled(Text)`
  margin-left: ${({ theme }) => theme.spacer.spacing3};
`;

const AddToCartButton = styled(Button)`
  position: absolute;
  right: 0;
  width: initial;
`;

export {
  OrderDetailItemContainer,
  OrderDetailItemImage,
  OrderDetailItemInformation,
  OrderDetailItemName,
  OrderDetailItemPriceContainer,
  OrderDetailItemConsumerPrice,
  VerticalLine,
  OrderDetailItemOriginalPrice,
  OrderDetailItemQuantity,
  AddToCartButton,
};
