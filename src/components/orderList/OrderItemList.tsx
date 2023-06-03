import { useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import { OrderList } from '../../types';
import OrderDetailNavigator from './OrderDetailNavigator';
import OrderItem from './OrderItem';

const OrderItemList = (orderList: OrderList) => {
  const orderId = useParams().id;

  const { products, createdAt, totalPayments } = orderList;
  const thumbnail = products[0];

  return (
    <S.List>
      <OrderDetailNavigator orderId={orderList.orderId} createdAt={createdAt} />
      {orderId ? (
        orderList.products.map((product) => (
          <OrderItem
            key={product.id}
            id={product.id}
            name={product.name}
            totalPrice={product.totalPrice}
            imageUrl={product.imageUrl}
            quantity={product.quantity}
            orderedProductCount={orderList.products.length}
            totalPayments={totalPayments}
          />
        ))
      ) : (
        <OrderItem
          id={thumbnail.id}
          name={thumbnail.name}
          totalPrice={thumbnail.totalPrice}
          imageUrl={thumbnail.imageUrl}
          quantity={thumbnail.quantity}
          orderedProductCount={orderList.products.length}
          totalPayments={totalPayments}
        />
      )}
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
