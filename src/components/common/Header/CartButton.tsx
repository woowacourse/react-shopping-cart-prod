import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { ButtonHTMLAttributes } from 'react';
import getCartLength from '../../../globalState/selectors/getCartLength';
import Colors from '../../../constant/Colors';

const CartButton = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { onClick } = props;
  const cartLength = useRecoilValue(getCartLength);

  return (
    <Button onClick={onClick}>
      <p>장바구니</p>
      <CartTotalQuantity>{cartLength}</CartTotalQuantity>
    </Button>
  );
};

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 6px;

  border: none;
  background: none;

  color: white;
  font-size: 24px;
  cursor: pointer;

  @media screen and (max-width: 520px) {
    & > p {
      display: none;
    }
  }
`;

const CartTotalQuantity = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 26px;
  height: 26px;

  border-radius: 50%;
  background: ${Colors.staleTurquoise};

  font-size: 16px;
`;

export default CartButton;
