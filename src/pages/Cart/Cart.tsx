import CartList from '../../components/Cart/CartList/index.tsx';
import {
  CartWrapper,
  EmptyCartButton,
  EmptyCartButtonWrapper,
  EmptyCartDescription,
  EmptyCartTitle,
  EmptyCartWrapper,
  PurchaseBoxWrapper,
} from './Cart.style.ts';
import { useRecoilValue } from 'recoil';
import { cartCountSelector } from '../../recoil/cartAtoms.ts';
import { useNavigate } from 'react-router-dom';
import { FatBorder, PageTitle } from '../../style/style.ts';
import PriceCounter from '../../components/Cart/PriceCounter/PriceCounter.tsx';

function Cart() {
  const cartCount = useRecoilValue(cartCountSelector);
  const navigate = useNavigate();

  return (
    <>
      <PageTitle>장바구니</PageTitle>
      <FatBorder />
      {cartCount > 0 ? (
        <>
          <CartWrapper>
            <CartList />
            <PurchaseBoxWrapper>
              <PriceCounter />
            </PurchaseBoxWrapper>
          </CartWrapper>
        </>
      ) : (
        <EmptyCartWrapper>
          <EmptyCartTitle>텅</EmptyCartTitle>
          <EmptyCartDescription>장바구니가 비어있어요.</EmptyCartDescription>
          <EmptyCartButtonWrapper>
            <EmptyCartButton onClick={() => navigate('/')}>홈으로 돌아가기</EmptyCartButton>
          </EmptyCartButtonWrapper>
        </EmptyCartWrapper>
      )}
    </>
  );
}

export default Cart;
