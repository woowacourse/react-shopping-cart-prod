import { orderSelector } from '../../../atoms/order';
import { useRefreshableRecoilValue } from '../../../hooks/common/useRefreshableAtom';
import Order from '../../common/Order/Order';
import * as S from './OrderList.styles';

const OrderList = () => {
  const { orders } = useRefreshableRecoilValue(orderSelector);

  return (
    <S.Root>
      {orders.map((order) => (
        <Order key={order.orderId} detail {...order} />
      ))}
    </S.Root>
  );
};

export default OrderList;
