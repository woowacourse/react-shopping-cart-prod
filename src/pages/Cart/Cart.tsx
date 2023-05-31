import * as S from './Cart.style.ts';
import { useRecoilValue } from 'recoil';
import { cartCountSelector } from '../../recoil/cartAtoms.ts';
import { useNavigate } from 'react-router-dom';
import { FatBorder, PageTitle } from '../../style/style.ts';
import PriceCounter from '../../components/Cart/PriceCounter/PriceCounter.tsx';
import CartList from '../../components/Cart/CartList/CartList.tsx';

function Cart() {
  const cartCount = useRecoilValue(cartCountSelector);
  const navigate = useNavigate();

  return (
    <>
      <PageTitle>장바구니</PageTitle>
      <FatBorder />
      {cartCount > 0 ? (
        <>
          <S.CartWrapper>
            <CartList />
            <S.PurchaseBoxWrapper>
              <PriceCounter />
            </S.PurchaseBoxWrapper>
          </S.CartWrapper>
        </>
      ) : (
        <S.EmptyCartWrapper>
          <S.EmptyCartTitle>텅</S.EmptyCartTitle>
          <S.EmptyCartDescription>장바구니가 비어있어요.</S.EmptyCartDescription>
          <S.EmptyCartButtonWrapper>
            <S.EmptyCartButton onClick={() => navigate('/')}>홈으로 돌아가기</S.EmptyCartButton>
          </S.EmptyCartButtonWrapper>
        </S.EmptyCartWrapper>
      )}
    </>
  );
}

export default Cart;
