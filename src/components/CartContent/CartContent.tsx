import { useEffect, useState } from 'react';

import cartAPI from 'apis/cart';
import { PayModal } from 'awesome-pay';
import { Button, CheckBox } from 'components/@shared';
import CartItem from 'components/CartItem/CartItem';
import { useDispatch } from 'react-redux';
import { cartActions } from 'redux/actions';
import { Cart } from 'types';
import { getAccessToken } from 'utils/auth';

import { CART_MESSAGE } from 'constants/message';

import * as S from './CartContent.styled';
import { Props } from './CartContent.type';

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

    const accessToken = getAccessToken();

    if (!accessToken) return;

    cartAPI
      .deleteItems(accessToken, checkedItems)
      .then(res => {
        dispatch(cartActions.setCart(res));
      })
      .catch(error => {
        alert(CART_MESSAGE.FAIL_DELETE);
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
    <S.CartContent>
      <S.ProductContainer>
        <S.ProductOptions>
          <S.AllCheckOption>
            <CheckBox
              id="all-check"
              checked={isAllChecked()}
              onChange={onChangeAllChecked}
            />
            <p>전체 선택/해제</p>
          </S.AllCheckOption>
          <S.DeleteButtonOption
            type="button"
            onClick={onClickCheckedDeleteButton}
          >
            선택 상품 삭제
          </S.DeleteButtonOption>
        </S.ProductOptions>
        {cartItems.length > 0 ? (
          cartItems.map(({ id, product, quantity }) => (
            <CartItem
              cartItemId={id}
              product={product}
              quantity={quantity}
              checked={checkedItems.includes(String(id))}
              setChecked={onChangeChecked}
              key={product.id}
            />
          ))
        ) : (
          <S.Message>장바구니에 상품이 없습니다 😅</S.Message>
        )}
      </S.ProductContainer>
      <S.TotalContainer>
        <h3>결제예상금액</h3>
        <hr />
        <S.TotalMoney>
          {calculateTotalMoney().toLocaleString('ko-KR')} 원
        </S.TotalMoney>
        <Button type="button" size="small" onClick={onClickOrderButton}>
          주문하기
        </Button>
      </S.TotalContainer>
      <PayModal
        showModal={showModal}
        toggleShowModal={toggleShowModal}
        companyName="나만 알고 싶은 짱구 스토어"
        totalPrice={calculateTotalMoney()}
        paymentFunc={paymentFunc}
      />
    </S.CartContent>
  );
}

export default CartContent;
