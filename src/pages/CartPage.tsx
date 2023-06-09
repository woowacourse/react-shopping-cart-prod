import CartList from '../components/cart/CartList';
import { CartListWrapper } from '../style/ContentLayout';
import { styled } from 'styled-components';
import { useScroll } from '../hooks/useScroll';
import useCartList from '../hooks/useCartList';

const CartPage = () => {
  const { cart, isLoading, totalPrice, usedPoint, handleOrder } = useCartList();
  const { isScrollDown: isButtonWrapperVisible } = useScroll();

  return (
    <>
      <CartListWrapper>
        <CartList cart={cart} isLoading={isLoading} />
      </CartListWrapper>
      {isButtonWrapperVisible && (
        <S.ButtonWrapper>
          <S.Price>{`${totalPrice.toLocaleString()}원 (사용한 포인트 ${usedPoint}원)`}</S.Price>
          <S.OrderButton onClick={handleOrder} disabled={totalPrice === 0}>
            주문하기
          </S.OrderButton>
        </S.ButtonWrapper>
      )}
    </>
  );
};

const S = {
  ButtonWrapper: styled.div`
    display: none;

    @media all and (max-width: 1023px) {
      position: fixed;
      display: flex;
      flex-direction: row;
      width: 100vw;
      height: 8vh;
      bottom: 0;
      border: solid #aaa;
      border-width: 1.5px 0 0 0;
    }
  `,

  Price: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50vw;
    color: black;
    background-color: #fff;
    font-size: 18px;
    font-weight: 600;

    @media all and (max-width: 479px) {
      font-size: 14px;
    }
  `,

  OrderButton: styled.button`
    width: 50vw;
    background-color: var(--mint-color);
    color: #fff;
    font-size: 18px;
    font-weight: 600;
    background-color: ${(props) => (props.disabled ? '#aaa' : '#04c09e')};
  `,
};

export default CartPage;
