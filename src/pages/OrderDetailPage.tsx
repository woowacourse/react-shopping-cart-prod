import { useParams } from 'react-router-dom';
import OrderCartItem from '../components/OrderCartItem';
import OrderListItem from '../components/OrderListItem';
import OrderPaymentDetails from '../components/OrderPaymentDetails';
import LoadingPlaceholder from '../components/common/LoadingPlaceholder';
import PageHeader from '../components/page/PageHeader';
import AwaitRecoilState from '../components/utils/AwaitRecoilState';
import userOrderDetailState from '../recoil/user/userOrderDetailState';

const OrderDetailPage = () => {
  const params = useParams();
  const orderId = Number(params.orderId);

  return (
    <>
      <PageHeader>주문내역 상세</PageHeader>

      <AwaitRecoilState
        state={userOrderDetailState(orderId)}
        loadingElement={<LoadingPlaceholder title="주문 상세 정보를 불러오는 중입니다 ..." />}
      >
        {(order) => (
          <>
            <OrderListItem order={order}>
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
              points={order.usedPoints}
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
