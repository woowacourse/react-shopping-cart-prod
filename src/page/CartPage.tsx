import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import * as S from './styles/CartPage.styles';
import CartItemList from '../components/cartList/CartItemList';
import CartBill from '../components/cartList/CartBill';
import { cartCountState } from '../atom/cart';
import { serverNameState } from '../atom/serverName';
import { loginState } from '../atom/login';
import { useGetCartList } from '../components/hooks/useGetCartList';

export default function CartPage() {
  const serverName = useRecoilValue(serverNameState);
  const loginCredential = useRecoilValue(loginState);
  const cartCount = useRecoilValue(cartCountState);
  const { getCartsThroughApi } = useGetCartList();

  useEffect(() => {
    getCartsThroughApi(serverName, loginCredential, true);
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
