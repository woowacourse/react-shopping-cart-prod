import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';

import CheckBox from 'component/common/CheckBox';
import ContentBox from 'component/common/ContentBox';
import CartItem from 'component/CartItem';

import * as S from 'page/ProductCartPage/style';

import useCartItem from 'hook/useCartItem';
import useSelectedItem from 'hook/useSelectedItem';
import {useNavigate} from 'react-router-dom';
import {CONFIRM_MESSAGE, PATH} from 'constant';
import useAuth from 'hook/useAuth';

export default function ProductCartPage() {
  const navigation = useNavigate();

  const cart = useSelector((state) => state.cartReducer.cart);

  const selectedItem = useSelector((state) => state.selectedItemReducer.selectedItem);

  const isLogin = useSelector((state) => state.authReducer.isLogin);

  const {initializeCart, deleteSelectedCart} = useCartItem();

  const {selectAllItem, unselectAllItem} = useSelectedItem();

  const {navigateLoginPage} = useAuth();

  useEffect(() => {
    navigateLoginPage();

    isLogin && initializeCart();
  }, [isLogin]);

  const selectedCartItem = cart.filter(({id}) => selectedItem.includes(id));

  const {totalQuantity, totalPrice} = selectedCartItem.reduce(
    (prev, cur) => ({
      totalQuantity: cur.quantity + prev.totalQuantity,
      totalPrice: cur.price * cur.quantity + prev.totalPrice,
    }),
    {totalQuantity: 0, totalPrice: 0},
  );

  const isAllChecked = cart.length === selectedItem.length && selectedItem.length > 0;

  const onClickOrderButton = () => {
    if (totalQuantity <= 0) {
      alert(CONFIRM_MESSAGE.PLEASE_CHOOSE_PRODUCT);
      return;
    }
    navigation(PATH.ORDER_PAY);
  };

  return (
    <S.ProductCartPageLayout>
      <S.HeaderSpan>장바구니</S.HeaderSpan>
      <S.CartInfoBox>
        <S.SelectCartBox>
          <S.SelectDeleteRow>
            <S.CheckBoxRow>
              <CheckBox
                initialChecked={isAllChecked}
                handleCheckedTrue={() => selectAllItem(cart)}
                handleCheckedFalse={unselectAllItem}
              />
              {isAllChecked ? '선택해제' : '전체선택'}
            </S.CheckBoxRow>
            <S.DeleteButton onClick={() => deleteSelectedCart(selectedItem)}>
              상품삭제
            </S.DeleteButton>
          </S.SelectDeleteRow>

          <S.ListHeaderSpan>장바구니 상품 ({cart.length}개)</S.ListHeaderSpan>
          <S.CartListBox>
            {cart.map((cartInfo) => {
              const initialChecked = selectedItem.includes(cartInfo.id);
              return (
                <React.Fragment key={cartInfo.id}>
                  <CartItem cartInfo={cartInfo} initialChecked={initialChecked} />
                  <hr />
                </React.Fragment>
              );
            })}
          </S.CartListBox>
        </S.SelectCartBox>

        <ContentBox
          headerText="결제예상금액"
          leftContent="결제예상금액"
          rightContent={`${totalPrice.toLocaleString()}원`}
          buttonText={`주문하기 (${totalQuantity}개)`}
          onClickButton={onClickOrderButton}
        />
      </S.CartInfoBox>
    </S.ProductCartPageLayout>
  );
}
