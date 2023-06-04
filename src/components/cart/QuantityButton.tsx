import { BsPlus, BsDash } from 'react-icons/bs';
import { useRecoilValue } from 'recoil';
import { styled } from 'styled-components';
import { QUANTITY } from '../../constants';
import { useSetCart } from '../../hooks/useCart';
import { quantitySelector } from '../../recoil';

type QuantityButtonProps = {
  productId: number;
  min: number;
  max: number;
};

const QuantityButton = ({ productId, min, max }: QuantityButtonProps) => {
  const quantity = useRecoilValue(quantitySelector(productId));
  const { updateCart, removeItemFromCart } = useSetCart(productId);

  const increaseQuantity = () => {
    if (quantity === max) return;

    updateCart(quantity + QUANTITY.STEP);
  };

  const decreaseQuantity = () => {
    if (quantity === min) return;

    if (quantity === QUANTITY.INITIAL) {
      removeItemFromCart();
      return;
    }

    updateCart(quantity - QUANTITY.STEP);
  };

  return (
    <Wrapper>
      <DownButton quantity={quantity} min={min} onClick={decreaseQuantity} aria-label="button-to-lower-quantity">
        <BsDash />
      </DownButton>
      <Quantity>{quantity}</Quantity>
      <UpButton quantity={quantity} max={max} onClick={increaseQuantity} aria-label="button-to-raise-quantity">
        <BsPlus />
      </UpButton>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  height: 32px;

  @media (max-width: 548px) {
    margin-bottom: 6px;
  }
`;

const Quantity = styled.span`
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
`;

const StyledButton = styled.button`
  width: 26px;
  max-width: 26px;
  border: 1px solid var(--gray-color-200);
  font-size: 16px;
  background: none;
  cursor: pointer;
`;

const UpButton = styled(StyledButton)<{ quantity: number; max: number }>`
  &[aria-label='button-to-raise-quantity'] {
    border-left: 0;
    cursor: ${(props) => props.quantity === props.max && 'default'};

    & > svg {
      fill: ${(props) => props.quantity === props.max && 'var(--gray-color-100)'};
    }
  }
`;

const DownButton = styled(StyledButton)<{ quantity: number; min: number }>`
  &[aria-label='button-to-lower-quantity'] {
    border-right: 0;
    cursor: ${(props) => props.quantity === props.min && 'default'};

    & > svg {
      fill: ${(props) => props.quantity === props.min && 'var(--gray-color-100)'};
    }
  }
`;

export default QuantityButton;
