import { BsPlus, BsDash } from 'react-icons/bs';
import { css, styled } from 'styled-components';
import { QUANTITY } from '../constants';
import { useCart } from '../hooks/useCart';
import Button from './common/Button';

const { MAX, MIN, STEP, NONE } = QUANTITY;

interface Props {
  isEnabledAtMin?: true;
  productId: number;
  quantity: number;
}

const QuantityButton = ({ isEnabledAtMin, productId, quantity }: Props) => {
  const { updateCart, removeItemFromCart } = useCart(productId);

  const handleQuantityStepUp = () => {
    if (quantity === MAX) return;

    const updatedQuantity = quantity + STEP;

    updateCart(updatedQuantity);
  };

  const handleQuantityStepDown = () => {
    if (!isEnabledAtMin && quantity === MIN) return;

    const updatedQuantity = quantity - STEP;

    if (isEnabledAtMin && updatedQuantity === NONE) return removeItemFromCart();

    updateCart(updatedQuantity);
  };

  return (
    <S.Wrapper>
      <Button
        css={buttonStyle(quantity, isEnabledAtMin)}
        onClick={handleQuantityStepDown}
        aria-label='상품 수량 1개 줄이기'
        disabled={!isEnabledAtMin && quantity === MIN}
      >
        <BsDash />
      </Button>
      <S.Quantity tabIndex={0} aria-label={`상품 개수 : ${quantity}개`}>
        {quantity}
      </S.Quantity>
      <Button
        css={buttonStyle(quantity)}
        onClick={handleQuantityStepUp}
        aria-label='상품 수량 1개 더하기'
        disabled={quantity === MAX}
      >
        <BsPlus />
      </Button>
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div`
    display: flex;
    margin: -8px 0 12px;

    @media (max-width: 548px) {
      margin-bottom: 6px;
    }
  `,

  Quantity: styled.span`
    display: block;
    width: 34px;
    border-top: 1px solid var(--gray-color-200);
    border-bottom: 1px solid var(--gray-color-200);
    text-align: center;
    font-size: 14px;
    line-height: 30px;
    cursor: default;

    @media (max-width: 548px) {
      font-size: 13px;
    }
  `,
};

const buttonStyle = (quantity: number, isEnabledAtMin?: true) => css`
  width: 26px;
  height: 32px;
  max-width: 26px;
  border: 1px solid var(--gray-color-200);
  font-size: 16px;

  &[aria-label='상품 수량 1개 더하기'] {
    border-left: 0;
    cursor: ${quantity === MAX && 'default'};
  }

  &[aria-label='상품 수량 1개 줄이기'] {
    border-right: 0;
    cursor: ${!isEnabledAtMin && quantity === MIN && 'default'};
  }
`;

export default QuantityButton;
