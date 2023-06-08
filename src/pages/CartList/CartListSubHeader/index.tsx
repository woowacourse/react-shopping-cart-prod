import { Suspense } from 'react';
import { useRecoilValue } from 'recoil';

import PageTitle from '@Components/PageTitle';

import useCartItems from '@Hooks/useCartItems';

import serverState from '@Atoms/serverState';

import * as S from './style';
import CartAmount from '../CartAmount';
import CartListController from '../CartListController';
import LoadingCartListController from '../CartListController/LoadingCartListController';

function CartListSubHeader() {
  const { cartItemsAmount } = useCartItems();
  const server = useRecoilValue(serverState);

  if (cartItemsAmount === '0') return <></>;

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
