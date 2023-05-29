import { Suspense } from 'react';
import { useRecoilValue } from 'recoil';

import PageTitle from '@Components/PageTitle';

import serverState from '@Atoms/serverState';

import cartItemsAmountState from '@Selector/cartItemsAmountState';

import * as S from './style';
import CartAmount from '../CartAmount';
import CartListController from '../CartListController';
import LoadingCartListController from '../CartListController/LoadingCartListController';

function CartListSubHeader() {
  const cartAmount = useRecoilValue(cartItemsAmountState);
  const server = useRecoilValue(serverState);

  if (cartAmount === '0') return <></>;

  return (
    <>
      <PageTitle title={`${server}의 장바구니`} />
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
