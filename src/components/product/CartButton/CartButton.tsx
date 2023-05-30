import { styled } from 'styled-components';
import { BsCart3 } from 'react-icons/bs';
import { useRef, useEffect } from 'react';
import colors from '../../../colors';

interface CartButtonProps {
  onClick: () => void;
}

const CartButton = ({ onClick }: CartButtonProps) => {
  const isLocked = useRef(false);

  useEffect(() => {
    isLocked.current = false;
  });

  const addProductToCart = () => {
    if (isLocked.current == true) return;

    isLocked.current = true;
    onClick();
  };

  return (
    <Button
      type="button"
      aria-label="장바구니에 추가하기"
      onClick={addProductToCart}
    >
      <BsCart3 />
    </Button>
  );
};

const Button = styled.button`
  background: ${colors.pureBlack};
  border-radius: 10px;
  padding: 7px;

  & {
    color: ${colors.gold};
    font-size: 27px;
    width: 42px;
    height: 42px;
  }
`;

export default CartButton;
