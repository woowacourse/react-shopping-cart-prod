import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { cartActions } from 'redux/actions';
import { getCarts } from 'redux/thunks/cart';

import CheckBox from 'components/@shared/CheckBox';
import CartItem from 'components/CartItem/CartItem';

import cartAPI from 'apis/cart';
import { CART_MESSAGE } from 'constants/message';
import { Cart, CartStoreState } from 'types/cart';

type Props = {
  cartItems: Array<Cart>;
};

function CartContent({ cartItems }: Props) {
  const dispatch = useDispatch();
  const [isAllChecked, setIsAllChecked] = useState(false);
  const { checkedCartItems } = useSelector(
    (state: { cart: CartStoreState }) => state.cart
  );

  const getTotalMoney = () => {
    return checkedCartItems.reduce((prevMoney, checkedCartItemId) => {
      const cartItem = cartItems.find(
        (cartItem) => cartItem.id === checkedCartItemId
      );

      if (cartItem) {
        const {
          product: { price },
        } = cartItem;

        return prevMoney + price * cartItem.quantity;
      }

      return prevMoney;
    }, 0);
  };

  const onChangeAllChecked = (
    e: React.MouseEvent<HTMLElement> | React.ChangeEvent<HTMLElement>
  ) => {
    e.preventDefault();

    setIsAllChecked((isAllChecked) => {
      if (isAllChecked) {
        cartItems.forEach(({ id }) =>
          dispatch(cartActions.uncheckCartItem(id))
        );
      } else {
        cartItems.forEach(
          ({ id }) =>
            !checkedCartItems.includes(id) &&
            dispatch(cartActions.checkCartItem(id))
        );
      }

      return !isAllChecked;
    });
  };

  const onClickCheckedDeleteButton = async () => {
    if (window.confirm(CART_MESSAGE.ASK_DELETE)) {
      try {
        await cartAPI.deleteCartItems(checkedCartItems);
        await dispatch(getCarts());
      } catch (error) {
        alert(error);
      }
    }
  };

  useEffect(() => {
    setIsAllChecked(checkedCartItems.length === cartItems.length);
  }, [checkedCartItems, cartItems]);

  return (
    <StyledContentBox>
      <StyledProductContainer>
        <StyledProductOptions>
          <StyledAllCheckOption>
            <CheckBox
              id="all-check"
              checked={isAllChecked}
              onChange={onChangeAllChecked}
            />
            <p>전체 선택/해제</p>
          </StyledAllCheckOption>
          <StyledDeleteButton
            type="button"
            onClick={onClickCheckedDeleteButton}
          >
            선택 상품 삭제
          </StyledDeleteButton>
        </StyledProductOptions>
        {cartItems.map(({ id, product, quantity }) => (
          <CartItem
            key={product.id}
            cartItemId={id}
            product={product}
            quantity={quantity}
            checked={isAllChecked}
          />
        ))}
      </StyledProductContainer>
      <StyledTotalContainer>
        <h3>결제예상금액</h3>
        <hr />
        <StyledTotalMoney>
          {getTotalMoney().toLocaleString('ko-KR')} 원
        </StyledTotalMoney>
        <StyledOrderButton type="button">주문하기</StyledOrderButton>
      </StyledTotalContainer>
    </StyledContentBox>
  );
}

const StyledContentBox = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 80px;

  width: 100%;
  margin-top: 30px;
`;

const StyledProductContainer = styled.div`
  grid-column: 1 / 5;
`;

const StyledProductOptions = styled.div`
  display: flex;
  justify-content: space-between;

  height: 30px;
  margin-bottom: 20px;
`;

const StyledAllCheckOption = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;

  font-size: 15px;
`;

const StyledDeleteButton = styled.button`
  width: 100px;
  border: 1px solid ${({ theme: { colors } }) => colors.lightGray};

  background: ${({ theme: { colors } }) => colors.white};
`;

const StyledTotalContainer = styled.div`
  grid-column: 5 / 7;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: sticky;
  top: 100px;

  height: fit-content;
  padding: 0 20px 20px;
  border: 1px solid ${({ theme: { colors } }) => colors.lightGray};

  background: ${({ theme: { colors } }) => colors.white};

  h3 {
    line-height: 50px;
  }

  hr {
    width: calc(100% + 40px);
    margin: 0 -20px;
  }
`;

const StyledTotalMoney = styled.div`
  line-height: 5px;
  border-bottom: 10px solid ${({ theme: { colors } }) => colors.pink};
  margin: 30px 0;
`;

const StyledOrderButton = styled.button`
  width: 80%;
  height: 40px;
  border-radius: 2px;

  background: ${({ theme: { colors } }) => colors.redPink};
  color: ${({ theme: { colors } }) => colors.white};
`;

export default CartContent;
