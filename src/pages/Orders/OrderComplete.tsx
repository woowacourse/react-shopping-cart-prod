import { useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import userState from '@recoil/user/userState';
import Layout from '@components/layout/Layout';
import OrderCompleteInfo from '@components/orders/OrderCompleteInfo';

function OrderComplete() {
  const user = useRecoilValue(userState);
  const location = useLocation();

  const { deliveryFee, discountPrice, totalItemsPrice, orderItemsCount, orderId } = location.state;
  return (
    <Layout>
      <OrderCompleteInfo
        deliveryFee={deliveryFee}
        discountPrice={discountPrice}
        totalItemsPrice={totalItemsPrice}
        orderItemsCount={orderItemsCount}
        userName={user.nickname}
        orderId={Number(orderId)}
      />
    </Layout>
  );
}

export default OrderComplete;
