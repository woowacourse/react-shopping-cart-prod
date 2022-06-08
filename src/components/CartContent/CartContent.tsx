import { CART_MESSAGE } from 'constants/message';
import CartItem from 'components/CartItem/CartItem';
import { Cart } from 'types';
import CheckBox from 'components/@shared/CheckBox';
import { cartActions } from 'redux/actions';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import cartAPI from 'apis/cart';

type Props = {
  cartItems: Cart[];
};

function CartContent({ cartItems }: Props) {
  const [checkedItems, setCheckedItems] = useState<Array<number>>([]);
  const dispatch = useDispatch();

  const checkCartItem = (targetId: number) => {
    if (checkedItems.includes(targetId)) {
      const newCheckedItems = checkedItems.filter(
        (checkedId) => checkedId !== targetId
      );
      setCheckedItems(newCheckedItems);
      return;
    }
    setCheckedItems((prev) => [...prev, targetId]);
  };

  const calculateTotalMoney = () => {
    return cartItems
      .filter((item) => checkedItems.includes(item.id))
      .reduce((prevMoney, item) => {
        const { quantity, product } = item;

        return prevMoney + product.price * quantity;
      }, 0);
  };

  const isAllChecked = () => {
    return (
      checkedItems.length !== 0 && cartItems.length === checkedItems.length
    );
  };

  const onChangeAllChecked = (
    e: React.MouseEvent<HTMLElement> | React.ChangeEvent<HTMLElement>
  ) => {
    e.preventDefault();

    if (isAllChecked()) {
      setCheckedItems([]);
      return;
    }
    setCheckedItems(cartItems.map((item) => item.id));
  };

  const onClickCheckedDeleteButton = () => {
    if (window.confirm(CART_MESSAGE.ASK_DELETE)) {
      checkedItems.forEach(async (id) => {
        const cartList = await cartAPI.deleteCartItem(id);
        dispatch(cartActions.setCartItemList(cartList));
        setCheckedItems([]);
      });
    }
  };

  return (
    <StyledContentBox>
      <StyledProductContainer>
        <StyledProductOptions>
          <StyledAllCheckOption>
            <CheckBox
              id="all-check"
              checked={isAllChecked()}
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
        {cartItems.map(({ id, quantity, product }) => (
          <CartItem
            product={product}
            stock={quantity}
            checked={checkedItems.includes(id)}
            checkCartItem={checkCartItem}
            cartId={id}
            key={product.id}
          />
        ))}
      </StyledProductContainer>
      <StyledTotalContainer>
        <h3>결제예상금액</h3>
        <hr />
        <StyledTotalMoney>
          {calculateTotalMoney().toLocaleString('ko-KR')} 원
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
