import { Suspense, useEffect } from 'react';
import { useRecoilValueLoadable } from 'recoil';

import SpinnerContainer from '../../components/common/SpinnerContainer/SpinnerContainer';
import { OrderedItemList } from '../../components/order/OrderedItemList/OrderedItemList';
import { CART_LIST_CHECKBOX_KEY } from '../../constants/store';
import { useCheckboxList } from '../../hooks/common/useCheckboxList';
import { cartIdListState } from '../../store/cart';
import * as S from './OrderPage.style';

const OrderPage = () => {
  const cartIdList = useRecoilValueLoadable(cartIdListState);
  const { setInitialCheckedList } = useCheckboxList(CART_LIST_CHECKBOX_KEY);

  useEffect(() => {
    if (cartIdList.state === 'hasValue') {
      setInitialCheckedList(cartIdList.contents);
    }
  }, [cartIdList.contents, cartIdList.state, setInitialCheckedList]);

  return (
    <>
      <S.OrderPageHeading size="small">주문 내역</S.OrderPageHeading>
      <S.OrderInformationContainer>
        <div>
          <Suspense fallback={<SpinnerContainer />}>
            <OrderedItemList />
          </Suspense>
        </div>
      </S.OrderInformationContainer>
    </>
  );
};

export default OrderPage;
