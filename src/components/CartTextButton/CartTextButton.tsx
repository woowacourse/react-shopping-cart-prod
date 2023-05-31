import { useRecoilValue } from 'recoil';
import { styled } from 'styled-components';
import { cartSelector } from '../../store/cart';
import { WIDTH } from '../../styles/mediaQuery';

const CartTextButton = () => {
  const { cartsQuantity } = useRecoilValue(cartSelector);

  return (
    <Container>
      <ShoppingCart>Cart</ShoppingCart>
      {cartsQuantity ? <CartQuantity>{cartsQuantity}</CartQuantity> : null}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 8px;

  width: 85px;

  cursor: pointer;

  @media (max-width: ${WIDTH.MD}) {
    width: 32px;
  }
`;

const ShoppingCart = styled.h2`
  font-size: 24px;
  font-weight: 300;

  color: #fff;
`;

const CartQuantity = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 26px;
  height: 26px;

  background: #04c09e;
  border-radius: 100%;
  font-weight: 300;

  font-size: 16px;
  color: #fff;

  @media (max-width: ${WIDTH.MD}) {
    display: none;
  }
`;

export default CartTextButton;
