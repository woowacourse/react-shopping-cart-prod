import styled, { keyframes, css } from 'styled-components';
import { CART } from 'constants/index';
import { alignCenter, directionColumn, spaceBetween } from 'styles/mixin';

const CartShake = keyframes`
  0%, 50%{
    transform: rotate(0deg);
	}
  5%, 15%, 25%, 35%, 45% {
    transform: rotate(13deg);
  }
  10%, 20%, 30%, 40% {
    transform: rotate(-13deg);
  }
`;

const CartCounterMoveUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(0);
  }
  100% {
    opacity: 1;
    transform: translateY(-25px);
  }
`;

const CartCounter = styled.div<{ isShowCartCounter: boolean }>`
  ${alignCenter};
  justify-content: space-evenly;
  background-color: ${({ theme }) => theme.colors.GRAY_50};
  border: 2px solid ${({ theme }) => theme.colors.TEAL_400};
  box-shadow: 0px 3px 3px ${({ theme }) => theme.colors.GRAY_800};
  border-radius: 25px;
  opacity: 0;
  position: absolute;
  top: -20px;
  right: 10px;
  width: 120px;
  height: 28px;
  animation: ${(props) =>
    props.isShowCartCounter &&
    css`
      ${CartCounterMoveUp} 0.5s
    `};
  animation-fill-mode: forwards;
`;

const CounterButton = styled.button`
  border: none;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.GRAY_50};
  cursor: pointer;
  width: 25px;
  height: 20px;
  border-radius: 15px;
`;

const DecreaseButton = styled(CounterButton)<{ quantity: number }>`
  background-color: ${({ quantity, theme }) =>
    quantity === CART.MIN_COUNT ? theme.colors.GRAY_400 : theme.colors.TEAL_400};
`;

const IncreaseButton = styled(CounterButton)<{ quantity: number }>`
  background-color: ${({ quantity, theme }) =>
    quantity === CART.MAX_COUNT ? theme.colors.GRAY_400 : theme.colors.TEAL_400};
`;

const CartImageBadge = styled.div`
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.RED_500};
  top: 0;
  left: 18px;
  z-index: 1;
`;

const CartImageWrapper = styled.div`
  cursor: pointer;
  position: relative;
  &:hover img {
    animation: ${CartShake} 2s infinite linear alternate;
  }
`;

const ProductContainer = styled.div`
  ${directionColumn};
  width: 220px;
  height: 288px;
`;

const ProductImageWrapper = styled.div`
  width: 220px;
  height: 220px;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0px 2px 2px ${({ theme }) => theme.colors.GRAY_300};

  img {
    width: 220px;
    height: 220px;
    cursor: pointer;
  }

  &:hover img {
    transform: scale(1.1);
  }
`;

const ProductInfoContainer = styled.div`
  ${spaceBetween};
  align-items: center;
  position: relative;
  padding: 0 10px;
`;

const ProductInfo = styled.div`
  ${directionColumn};
  margin-top: 12px;
  padding-right: 10px;

  span + span {
    margin-top: 5px;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
  }

  &:hover {
    text-decoration: underline;
  }
  &:first-child {
    font-size: 14px;
    cursor: pointer;
  }
`;

export {
  ProductContainer,
  ProductInfoContainer,
  ProductInfo,
  ProductImageWrapper,
  CartCounter,
  CartImageWrapper,
  CartImageBadge,
  DecreaseButton,
  IncreaseButton,
};
