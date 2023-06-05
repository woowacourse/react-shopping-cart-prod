import { useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import { OrderList } from '../../types';
import OrderDetailNavigator from './OrderDetailNavigator';
import OrderItem from './OrderItem';

interface Props {
  tag?: string;
  orderList: OrderList;
}

const OrderItemList = ({ tag, orderList }: Props) => {
  const orderId = useParams().id;

  const { products, createdAt, totalPayments, orderStatus } = orderList;
  const thumbnail = products[0];

  const listTag = tag || 'li';

  return (
    <S.List as={listTag}>
      <ul>
        <OrderDetailNavigator
          orderId={orderList.orderId}
          createdAt={createdAt}
          orderStatus={orderStatus}
        />
        {orderId ? (
          products.map((product) => (
            <OrderItem
              key={product.id}
              id={product.id}
              name={product.name}
              totalPrice={product.totalPrice}
              imageUrl={product.imageUrl}
              quantity={product.quantity}
              orderedProductCount={products.length}
              totalPayments={totalPayments}
              orderStatus={orderStatus}
            />
          ))
        ) : (
          <OrderItem
            id={thumbnail.id}
            orderId={orderList.orderId}
            name={thumbnail.name}
            totalPrice={thumbnail.totalPrice}
            imageUrl={thumbnail.imageUrl}
            quantity={thumbnail.quantity}
            orderedProductCount={orderList.products.length}
            totalPayments={totalPayments}
            orderStatus={orderStatus}
          />
        )}
      </ul>
    </S.List>
  );
};

const S = {
  List: styled.li`
    flex: 1;
    margin-bottom: 50px;
    padding: 0 24px;

    @media (max-width: 480px) {
      padding: 0;
    }
  `,
};

export default OrderItemList;
