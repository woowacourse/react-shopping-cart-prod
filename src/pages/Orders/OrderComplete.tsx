import { useLocation } from 'react-router-dom';
import Layout from '@components/layout/Layout';
import OrderCompleteInfo from '@components/orders/OrderCompleteInfo';

function OrderComplete() {
  const location = useLocation();

  const { deliveryFee, discountPrice, totalItemsPrice, orderItemsCount } = location.state;
  return (
    <Layout>
      <OrderCompleteInfo
        deliveryFee={deliveryFee}
        discountPrice={discountPrice}
        totalItemsPrice={totalItemsPrice}
        orderItemsCount={orderItemsCount}
        userName=""
      />
    </Layout>
  );
}

export default OrderComplete;
