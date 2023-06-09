import { orderSelector } from '../../../atoms/order';
import useQueryString from '../../../hooks/common/useQueryString';
import { useRefreshableRecoilValue } from '../../../hooks/common/useRefreshableAtom';
import OrderItemList from '../../common/Order/Order';
import TotalPrice from '../TotalPrice/TotalPrice';
import * as S from './OrderDetail.styles';

const OrderDetail = () => {
  const { id } = useQueryString(['id']);
  const orders = useRefreshableRecoilValue(orderSelector(Number(id)));

  return (
    <S.Root>
      <OrderItemList detail={false} {...orders} />
      <TotalPrice totalPrice={orders.totalPrice} />
    </S.Root>
  );
};

export default OrderDetail;
