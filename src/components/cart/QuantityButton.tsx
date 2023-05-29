import { BsPlus, BsDash } from 'react-icons/bs';
import { useSetRecoilState } from 'recoil';
import { css, styled } from 'styled-components';
import { QUANTITY, STEP_HANDLER } from '../../constants';
import { useSetCart } from '../../hooks/useCart';
import { quantitySelector } from '../../recoil';
import Button from '../common/Button';

const { MAX, MIN, STEP } = QUANTITY;
const { UP, DOWN } = STEP_HANDLER;

interface Props {
  productId: number;
  quantity: number;
}

const QuantityButton = ({ productId, quantity }: Props) => {
  const setQuantity = useSetRecoilState(quantitySelector(productId));
  const { updateCart } = useSetCart(productId);

  const handleQuantityChange = (quantityLimit: number, handler: keyof typeof STEP_HANDLER) => {
    if (quantity === quantityLimit) return;

    const updatedQuantity = handler === UP ? quantity + STEP : quantity - STEP;

    setQuantity(updatedQuantity);
    updateCart(updatedQuantity);
  };

  return (
    <S.Wrapper>
      <Button
        css={buttonStyle(quantity)}
        onClick={() => handleQuantityChange(MIN, DOWN)}
        aria-label='button-to-lower-quantity'
      >
        <BsDash />
      </Button>
      <S.Quantity>{quantity}</S.Quantity>
      <Button
        css={buttonStyle(quantity)}
        onClick={() => handleQuantityChange(MAX, UP)}
        aria-label='button-to-raise-quantity'
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

const buttonStyle = (quantity: number) => css`
  width: 26px;
  max-width: 26px;
  border: 1px solid var(--gray-color-200);
  font-size: 16px;

  &[aria-label='button-to-raise-quantity'] {
    border-left: 0;
    cursor: ${quantity === MAX && 'default'};

    & > svg {
      fill: ${quantity === MAX && 'var(--gray-color-100)'};
    }
  }

  &[aria-label='button-to-lower-quantity'] {
    border-right: 0;
    cursor: ${quantity === MIN && 'default'};

    & > svg {
      fill: ${quantity === MIN && 'var(--gray-color-100)'};
    }
  }
`;

export default QuantityButton;
