import { useLocation, useNavigate } from 'react-router-dom';
import ContentLayout from 'src/components/Common/ContentLayout';
import OrderItem from 'src/components/OrderItem';
import PaymentsView from 'src/components/PaymentsView';
import useOrderDetail from 'src/hooks/useOrderDetail';
import { ROUTE_PATH } from 'src/constants';
import LoadingSpinner from 'src/components/Common/LoadingSpinner';
import styles from './index.module.scss';

function OrderDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const orderId = location.pathname.split('/').at(-1) ?? null;

  const { orderDetailData, loading } = useOrderDetail({ orderId });

  if (loading) {
    return (
      <div className={styles['loading-container']}>
        <LoadingSpinner size="medium" />
      </div>
    );
  }

  if (!orderDetailData) {
    navigate(ROUTE_PATH.ORDER);
    return <div />;
  }

  return (
    <ContentLayout title="주문 내역 상세">
      <div>
        <OrderItem
          order={{
            id: orderDetailData.id,
            orderTime: orderDetailData.orderTime,
            productList: orderDetailData.productList,
          }}
        />
      </div>
      <div className={styles['payment-container']}>
        <div>
          <PaymentsView paymentAmount={orderDetailData.paymentAmount} puschaseOption={false} />
        </div>
      </div>
    </ContentLayout>
  );
}

export default OrderDetail;
