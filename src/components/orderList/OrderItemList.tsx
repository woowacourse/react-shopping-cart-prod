import { styled } from 'styled-components';
import { OrderList } from '../../types';
import OrderDetailNavigator from './OrderDetailNavigator';
import OrderItem from './OrderItem';

const OrderItemList = (orderList: OrderList) => {
  const thumbnail = orderList.products[0];

  return (
    <S.List>
      <OrderDetailNavigator orderId={orderList.orderId} />
      <OrderItem
        id={thumbnail.id}
        name={thumbnail.name}
        totalPrice={thumbnail.totalPrice}
        imageUrl={thumbnail.imageUrl}
        quantity={thumbnail.quantity}
        orderedProductCount={orderList.products.length}
      />
    </S.List>
  );
};

const S = {
  List: styled.ul`
    flex: 1;
    margin-bottom: 50px;
    padding: 0 24px;
  `,
};

export default OrderItemList;
