import { Suspense, useEffect } from 'react';
import { useRecoilValueLoadable, useSetRecoilState } from 'recoil';

import CartCheckoutBox from '../../components/cart/CartCheckoutBox/CartCheckoutBox';
import CartList from '../../components/cart/CartList/CartList';
import CartListSkeleton from '../../components/cart/CartList/CartListSkeleton';
import CartListHeader from '../../components/cart/CartListHeader/CartListHeader';
import PageHeading from '../../components/common/PageHeading/PageHeading';
import { useScrollToTop } from '../../hooks/common/useScrollToTop';
import { cartIdListState } from '../../store/cart';
import { checkedCartIdListState } from '../../store/cartCheckbox';
import * as S from './CartPage.style';

const CartPage = () => {
  const cartIdList = useRecoilValueLoadable(cartIdListState);
  const setCheckedCartItems = useSetRecoilState(checkedCartIdListState);
  useScrollToTop();

  useEffect(() => {
    if (cartIdList.state === 'hasValue') {
      setCheckedCartItems(new Set(cartIdList.contents));
    }
  }, [cartIdList, setCheckedCartItems]);

  return (
    <>
      <PageHeading>장바구니</PageHeading>
      <S.CartInformationContainer>
        <div>
          <CartListHeader />
          <Suspense fallback={<CartListSkeleton />}>
            <CartList />
          </Suspense>
        </div>
        <CartCheckoutBox />
      </S.CartInformationContainer>
    </>
  );
};

export default CartPage;
