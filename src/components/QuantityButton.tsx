import { BsPlus, BsDash } from 'react-icons/bs';
import { useSetRecoilState } from 'recoil';
import { css, styled } from 'styled-components';
import { QUANTITY } from '../constants';
import { useSetCart } from '../hooks/useCart';
import { quantitySelector } from '../recoil';
import Button from './common/Button';

const { MAX, MIN, STEP, NONE, INITIAL } = QUANTITY;

interface Props {
  isMainPage?: true;
  productId: number;
  quantity: number;
}

const QuantityButton = ({ isMainPage, productId, quantity }: Props) => {
  const setQuantity = useSetRecoilState(quantitySelector(productId));
  const { updateCart, removeItemFromCart } = useSetCart(productId);

  const handleQuantityStepUp = () => {
    if (quantity === MAX) return;

    const updatedQuantity = quantity + STEP;

    setQuantity(updatedQuantity);
    updateCart(updatedQuantity);
  };

  const handleQuantityStepDown = () => {
    if (!isMainPage && quantity === MIN) return;

    const updatedQuantity = quantity - STEP;

    if (isMainPage && updatedQuantity === NONE) {
      removeItemFromCart();

      return setQuantity(INITIAL);
    }

    setQuantity(updatedQuantity);
    updateCart(updatedQuantity);
  };

  return (
    <S.Wrapper>
      <Button
        css={buttonStyle(quantity, isMainPage)}
        onClick={handleQuantityStepDown}
        aria-label='상품 수량 1개 줄이기'
        disabled={!isMainPage && quantity === MIN}
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

const buttonStyle = (quantity: number, isMainPage?: true) => css`
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
    cursor: ${!isMainPage && quantity === MIN && 'default'};
  }
`;

export default QuantityButton;
