import OrderItemList from '../../common/OrderItemList/OrderItemList';
import TotalPrice from '../TotalPrice/TotalPrice';
import * as S from './OrderDetail.styles';

const OrderDetail = () => {
  return (
    <S.Root>
      <OrderItemList detail={false} />
      <TotalPrice />
    </S.Root>
  );
};

export default OrderDetail;
