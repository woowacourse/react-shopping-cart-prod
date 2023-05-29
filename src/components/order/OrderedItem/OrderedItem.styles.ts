import { styled } from 'styled-components';

import { Button } from '../../common/Button/Button.styles';
import { Text } from '../../common/Text/Text.styles';

export const OrderContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const OrderId = styled(Text)``;

export const OrderedItemContainer = styled.li`
  display: flex;
  align-items: center;
`;

export const OrderedItemImageWrapper = styled.div`
  width: 80px;
  height: 80px;
  margin-left: ${({ theme }) => theme.spacer.spacing3};
  margin-right: ${({ theme }) => theme.spacer.spacing4};
`;

export const OrderedItemImage = styled.img`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.color.gray2};
  object-fit: cover;
  border-radius: ${({ theme }) => theme.borderRadius.small};
`;

export const OrderedItemInformationContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const OrderedItemName = styled(Text)`
  width: 300px;
  margin-right: ${({ theme }) => theme.spacer.spacing4};
  overflow: hidden;
  white-space: nowrap;
  word-break: break-all;

  &.skeleton::after {
    font-size: 0;
    content: 'loading';
  }

  @media screen and (max-width: 600px) {
    width: calc(100% - 178px);
  }
`;

export const OrderedItemPrice = styled(Text)`
  width: 126px;
  margin-right: 12px;
  padding-left: 12px;
  text-align: right;
  letter-spacing: -0.2px;

  &.skeleton::after {
    font-size: 0;
    content: 'loading';
  }

  @media screen and (max-width: 600px) {
    margin-top: -74px;
    margin-left: 144px;
    padding-left: 0;
    text-align: left;
  }
`;

export const OrderedItemQuantity = styled(Text)``;

export const AddItemToCartButton = styled(Button)``;
