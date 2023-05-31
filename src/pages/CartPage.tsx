import { styled } from 'styled-components';
import Bill from '../components/Bill/Bill';
import CartItemList from '../components/CartItemList/CartItemList';
import { ReactComponent as Teung } from '../assets/img/empty-cart.svg';
import { useRecoilValue } from 'recoil';
import { cartSelector } from '../store/cart';
import { WIDTH } from '../styles/mediaQuery';

const CartPage = () => {
  const { cartsQuantity } = useRecoilValue(cartSelector);

  return (
    <Wrapper>
      <Title>장바구니</Title>
      <MainInfo>
        {cartsQuantity ? (
          <>
            <CartItemList />
            <Bill />
          </>
        ) : (
          <EmptyCart>No item in your cart.</EmptyCart>
        )}
      </MainInfo>
    </Wrapper>
  );
};

export default CartPage;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;

  @media (max-width: ${WIDTH.XL}) {
    justify-content: start;
  }
`;

const EmptyCart = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 400px;

  color: #d3d3d3;

  font-size: 50px;

  @media (max-width: ${WIDTH.MD}) {
    height: 100px;
    font-size: 24px;
  }
`;

const Title = styled.div`
  width: 70%;

  padding: 16px;

  text-align: center;
  font-weight: 200;
  font-size: 32px;

  border-bottom: 1px solid #333333;

  @media (max-width: ${WIDTH.LG}) {
    padding: 4px;
    font-size: 24px;
  }
`;

const MainInfo = styled.div`
  display: flex;
  align-items: start;
  justify-content: center;
  gap: 32px;

  width: 80%;

  padding: 24px;

  @media (max-width: ${WIDTH.XL}) {
    flex-direction: column;
    align-items: center;
    gap: 0;
  }
`;
