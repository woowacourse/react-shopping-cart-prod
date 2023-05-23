import { Suspense } from 'react';
import { useRecoilValue } from 'recoil';

import cartItemsAmountState from '@Selector/cartItemsAmountState';

import * as S from './style';
import CartAmount from '../CartAmount';
import CartListController from '../CartListController';
import LoadingCartListController from '../CartListController/LoadingCartListController';

function CartListSubHeader() {
  const cartAmount = useRecoilValue(cartItemsAmountState);

  if (cartAmount === '0') return <></>;

  return (
    <>
      <S.Title>장바구니</S.Title>
      <S.CartListSubHeader>
        <Suspense fallback={<CartAmount isLoading />}>
          <CartAmount />
        </Suspense>
        <Suspense fallback={<LoadingCartListController />}>
          <CartListController />
        </Suspense>
      </S.CartListSubHeader>
    </>
  );
}

export default CartListSubHeader;
