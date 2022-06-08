import { useEffect, useState } from 'react';

import cartAPI from 'apis/cart';
import { PayModal } from 'awesome-pay';
import { Button, CheckBox } from 'components/@shared';
import CartItem from 'components/CartItem/CartItem';
import { useDispatch } from 'react-redux';
import { cartActions } from 'redux/actions';
import styled from 'styled-components';
import { Cart } from 'types/index';
import { getAccessToken } from 'utils/auth';

import { CART_MESSAGE } from 'constants/message';

type Props = {
  cartItems: Array<Cart>;
};

function CartContent({ cartItems }: Props) {
  const [checkedItems, setCheckedItems] = useState<Array<Cart['id']>>([]);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setCheckedItems([]);
  }, [cartItems.length]);

  const toggleShowModal = () => {
    setShowModal(prevState => !prevState);
  };

  const calculateTotalMoney = () => {
    const totalMoney = cartItems.reduce((prevMoney, item) => {
      if (!checkedItems.includes(String(item.id))) return prevMoney;

      const { product, quantity } = item;

      return prevMoney + product.price * quantity;
    }, 0);

    return totalMoney;
  };

  const isAllChecked = () => {
    return cartItems.length === checkedItems.length;
  };

  const onChangeAllChecked = (
    e: React.MouseEvent<HTMLElement> | React.ChangeEvent<HTMLElement>
  ) => {
    e.preventDefault();

    if (isAllChecked()) {
      setCheckedItems([]);

      return;
    }

    setCheckedItems(() => cartItems.map(item => String(item.id)));
  };

  const onChangeChecked = (
    e: React.MouseEvent<HTMLElement> | React.ChangeEvent<HTMLElement>
  ) => {
    e.preventDefault();

    if (!(e.currentTarget instanceof HTMLLabelElement)) return;

    const id = e.currentTarget.getAttribute('for') as string;

    setCheckedItems(prevState => {
      if (prevState.includes(id)) {
        return prevState.filter(cartId => cartId !== id);
      }
      return [...prevState, id];
    });
  };

  const onClickCheckedDeleteButton = () => {
    if (checkedItems.length === 0) {
      alert(CART_MESSAGE.NEED_CHECKED_ITEM);

      return;
    }

    if (!window.confirm(CART_MESSAGE.ASK_DELETE)) return;

    checkedItems.forEach(cartId => {
      const accessToken = getAccessToken();

      if (!accessToken) return;

      cartAPI
        .delete(accessToken, cartId)
        .catch(error => {
          alert(CART_MESSAGE.FAIL_DELETE);
        })
        .then(res => {
          dispatch(cartActions.setCart(res));
        });
    });
  };

  const onClickOrderButton = () => {
    if (checkedItems.length === 0) {
      alert(CART_MESSAGE.NEED_CHECKED_ITEM);

      return;
    }

    toggleShowModal();
  };

  const paymentFunc = () => {
    alert('아직 실제 주문은 구현하지 않았습니다 😅');

    toggleShowModal();
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
        {cartItems.map(({ id, product, quantity }) => (
          <CartItem
            cartItemId={id}
            product={product}
            quantity={quantity}
            checked={checkedItems.includes(String(id))}
            setChecked={onChangeChecked}
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
        <Button type="button" size="small" onClick={onClickOrderButton}>
          주문하기
        </Button>
      </StyledTotalContainer>
      <PayModal
        showModal={showModal}
        toggleShowModal={toggleShowModal}
        companyName="나만 알고 싶은 짱구 스토어"
        totalPrice={calculateTotalMoney()}
        paymentFunc={paymentFunc}
      />
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

export default CartContent;
