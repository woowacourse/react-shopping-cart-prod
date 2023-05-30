import { useParams } from 'react-router-dom';
import OrderCartItem from '../components/OrderCartItem';
import OrderListItem from '../components/OrderListItem';
import OrderPaymentDetails from '../components/OrderPaymentDetails';
import PageHeader from '../components/PageHeader';
import AwaitRecoilState from '../components/utils/AwaitRecoilState';
import orderDetailQuery from '../recoil/queries/orderDetailQuery';

const OrderDetailPage = () => {
  const params = useParams();
  const orderId = Number(params.orderId);

  return (
    <>
      <PageHeader>주문내역 상세</PageHeader>

      <AwaitRecoilState state={orderDetailQuery(orderId)}>
        {(order) => (
          <>
            <OrderListItem orderId={order.id}>
              {order.cartItems.map((orderCartItem) => (
                <OrderCartItem
                  productName={orderCartItem.name}
                  productPrice={orderCartItem.price}
                  quantity={orderCartItem.quantity}
                  imageUrl={orderCartItem.imageUrl}
                />
              ))}
            </OrderListItem>

            <OrderPaymentDetails
              points={order.points}
              savingRate={order.savingRate}
              price={order.cartItems.reduce(
                (price, orderCartItem) => price + orderCartItem.price * orderCartItem.quantity,
                0,
              )}
            />
          </>
        )}
      </AwaitRecoilState>
    </>
  );
};

export default OrderDetailPage;
