import { within } from '@storybook/testing-library';
import { styled } from 'styled-components';

import { Button } from '../../common/Button/Button.styles';
import { Text } from '../../common/Text/Text.styles';

export const Container = styled.div``;

export const OrderIdWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 16px;
  border-bottom: 2px solid ${({ theme }) => theme.color.gray5};
`;

export const OrderId = styled(Text).attrs({ size: 'xLarge' })`
  font-weight: 600;
`;

export const ShowDetail = styled(Text).attrs({ size: 'medium' })`
  cursor: pointer;
  font-weight: 500;
`;

export const OrderContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const OrderedItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  width: 820px;
`;

export const ImageAndInformationContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const OrderedItemImageWrapper = styled.div`
  min-width: 100px;
  height: 100px;
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
  gap: 4px;
`;

export const OrderedItemKeyValueContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const OrderedItemKeyText = styled(Text).attrs({ size: 'small' })`
  min-width: 60px;
  color: ${({ theme }) => theme.color.gray4};
`;

export const OrderedItemName = styled(Text)`
  margin-right: ${({ theme }) => theme.spacer.spacing4};
  overflow: hidden;
  white-space: nowrap;
  word-break: break-all;
  font-weight: 600;

  &.skeleton::after {
    font-size: 0;
    content: 'loading';
  }

  @media screen and (max-width: 600px) {
    width: calc(100% - 178px);
  }
`;

export const OrderedItemPrice = styled(Text)`
  margin-right: 12px;
  letter-spacing: -0.2px;
  font-weight: 600;

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

export const AddItemToCartButton = styled(Button)`
  width: initial;
`;
