import { useParams } from 'react-router-dom';
import { OrderList } from '../../components/Order/OrderList';
import { FatBorder, PageTitle } from '../../style/style';
import { OrderListWrapper } from '../Order/Order.style';
import { PaymentInfoBox } from '../../components/Order/PaymentInfoBox';
import { PointInfoBox } from '../../components/Order/PointInfoBox';
import * as S from './OrderDetail.style';
import { useRecoilValue } from 'recoil';
import { memberAuthorization } from '../../recoil/userAtoms';
import { serverState } from '../../recoil/serverAtom';
import useGetQuery from '../../hooks/useGetQuery';
import { Order } from '../../types/types';
import { fetchOrder } from '../../api/fetcher';

function OrderDetail() {
  const { orderId } = useParams() as { orderId: string };
  const memberAuth = useRecoilValue(memberAuthorization);
  const server = useRecoilValue(serverState);
  const { data: order } = useGetQuery<Order>({
    fetcher: fetchOrder({ server, auth: memberAuth, orderId }),
  });

  return (
    <>
      <PageTitle>주문내역상세</PageTitle>
      <FatBorder />
      {order && (
        <>
          <OrderListWrapper>
            <OrderList {...order} detail={false} />
          </OrderListWrapper>
          <S.OrderInfoWrapper>
            <PaymentInfoBox {...order} />
            <PointInfoBox paymentPrice={order.paymentPrice} />
          </S.OrderInfoWrapper>
        </>
      )}
    </>
  );
}

export default OrderDetail;
