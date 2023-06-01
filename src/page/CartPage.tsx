import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import * as S from './styles/CartPage.styles';
import CartItemList from '../components/cartList/CartItemList';
import CartBill from '../components/cartList/CartBill';
import { cartCountState, cartState, checkedListState } from '../atom/cart';
import * as api from '../api';
import useToast from '../components/hooks/useToast';
import { API_ERROR_MESSAGE } from '../constants';
import { serverNameState } from '../atom/serverName';
import { CartType } from '../types';
import { loginState } from '../atom/login';

export default function CartPage() {
  const serverName = useRecoilValue(serverNameState);
  const cartCount = useRecoilValue(cartCountState);
  const setCart = useSetRecoilState(cartState);
  const setCheckedList = useSetRecoilState(checkedListState);
  const loginCredential = useRecoilValue(loginState);
  const { showToast } = useToast();

  console.log(loginCredential);

  useEffect(() => {
    try {
      api.getCart<CartType>(serverName, loginCredential).then((cart) => {
        setCart(cart);
        setCheckedList(Array(cart.length).fill(true));
      });
    } catch {
      showToast('error', API_ERROR_MESSAGE.getCart);
    }
  }, [serverName]);

  return (
    <>
      <S.CartHeader>
        <h2>장바구니</h2>
      </S.CartHeader>
      {cartCount !== 0 ? (
        <S.CartMain>
          <CartItemList />
          <S.CartBillBox>
            <CartBill />
          </S.CartBillBox>
        </S.CartMain>
      ) : (
        <S.EmptyCartMain>
          <S.Image src="./shoppingBag.svg" />
          <S.Message>장바구니에 상품이 없습니다.</S.Message>
          <S.Message>상품을 추가해보세요.</S.Message>
          <S.StyledLink to="/">상품 담으러 가기</S.StyledLink>
        </S.EmptyCartMain>
      )}
    </>
  );
}
