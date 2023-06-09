import { Suspense } from 'react';

import CartCheckoutBox from '../../components/cart/CartCheckoutBox/CartCheckoutBox';
import CartCheckoutBoxSkeleton from '../../components/cart/CartCheckoutBox/CartCheckoutBoxSkeleton';
import CartList from '../../components/cart/CartList/CartList';
import CartListSkeleton from '../../components/cart/CartList/CartListSkeleton';
import CartListHeader from '../../components/cart/CartListHeader/CartListHeader';
import PageHeading from '../../components/common/PageHeading/PageHeading';
import { useScrollToTop } from '../../hooks/common/useScrollToTop';
import * as S from './CartPage.style';

const CartPage = () => {
  useScrollToTop();

  return (
    <>
      <PageHeading>장바구니</PageHeading>
      <S.InformationContainer>
        <div>
          <CartListHeader />
          <Suspense fallback={<CartListSkeleton />}>
            <CartList />
          </Suspense>
        </div>
        <Suspense fallback={<CartCheckoutBoxSkeleton />}>
          <CartCheckoutBox />
        </Suspense>
      </S.InformationContainer>
    </>
  );
};

export default CartPage;
