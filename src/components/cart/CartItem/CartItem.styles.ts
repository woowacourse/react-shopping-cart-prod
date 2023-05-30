import { styled } from 'styled-components';

import Button from '../../common/Button/Button';
import { Text } from '../../common/Text/Text.styles';

const CartItemContainer = styled.li`
  display: flex;
  align-items: center;

  @media screen and (max-width: 600px) {
    flex-wrap: wrap;
    align-items: flex-start;
  }
`;

const CartItemImageWrapper = styled.div`
  width: 80px;
  height: 80px;
  margin-left: ${({ theme }) => theme.spacer.spacing3};
  margin-right: ${({ theme }) => theme.spacer.spacing4};

  @media screen and (max-width: 600px) {
    margin-right: ${({ theme }) => theme.spacer.spacing3};
  }
`;

const CartItemImage = styled.img`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.color.gray2};
  object-fit: cover;
  border-radius: ${({ theme }) => theme.borderRadius.small};
`;

const CartItemInformationContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  row-gap: ${({ theme }) => theme.spacer.spacing2};

  & > p {
    font-weight: 600;
  }

  @media screen and (max-width: 600px) {
    width: calc(100% - 140px);
  }
`;

const CartItemName = styled(Text)`
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
    width: 100%;
  }
`;

const CartItemPriceContainer = styled.div`
  width: 126px;
  margin-right: 12px;
  padding-left: 12px;
  display: flex;
  flex-direction: column;
  text-align: right;
  letter-spacing: -0.2px;

  &.skeleton {
    min-height: 30px;

    &::after {
      font-size: 0;
      content: 'loading';
    }
  }

  @media screen and (max-width: 600px) {
    width: 100%;
    margin-right: ${({ theme }) => theme.spacer.spacing4};
    padding-left: 0;
    text-align: left;
  }
`;

const CustomerPrice = styled(Text)`
  font-weight: 500;
`;

const OriginalPrice = styled(Text)`
  color: #b1b3b5;
  font-weight: normal;
  text-decoration: line-through;
`;

const CartItemDeleteButton = styled(Button)`
  width: 30px;
  height: 30px;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  & path {
    stroke: ${({ theme }) => theme.color.gray3};
    transition: all 0.2s ease-in;
  }

  &:hover:enabled {
    background-color: transparent;

    & path {
      stroke: ${({ theme }) => theme.color.gray4};
    }
  }

  &.skeleton {
    border: none;
    outline: 0;
    pointer-events: none;
  }

  @media screen and (max-width: 600px) {
    position: absolute;
    right: 0;
  }
`;

export {
  CartItemContainer,
  CartItemImageWrapper,
  CartItemImage,
  CartItemInformationContainer,
  CartItemName,
  CartItemPriceContainer,
  CustomerPrice,
  OriginalPrice,
  CartItemDeleteButton,
};
