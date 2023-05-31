import { Suspense } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import SpinnerContainer from '../../components/common/SpinnerContainer/SpinnerContainer';
import { OrderedItem } from '../../components/order/OrderedItem/OrderedItem';
import { OrderedItemDetailInformation } from '../../components/order/OrderedItemDetailInformation/OrderedItemDetailInformation';
import { detailOrderState } from '../../store/order';
import * as S from './OrderDetailPage.style';

type Props = {};

export const OrderDetailPage = ({}: Props) => {
  const { orderId } = useParams();
  const orderedItem = useRecoilValue(detailOrderState(Number(orderId)));

  return (
    <>
      <S.OrderPageHeading size="small">주문 내역 상세</S.OrderPageHeading>
      <Suspense fallback={<SpinnerContainer />}>
        <S.Container>
          <OrderedItem {...orderedItem} />
          <OrderedItemDetailInformation {...orderedItem} />
        </S.Container>
      </Suspense>
    </>
  );
};
