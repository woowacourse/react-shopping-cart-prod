import { Suspense } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ContentLayout from 'src/components/Common/ContentLayout';
import LoadingSpinner from 'src/components/Common/LoadingSpinner';
import ErrorBoundary from 'src/components/ErrorBoundary';
import FetchFail from 'src/components/FetchFail';
import OrderItem from 'src/components/OrderItem';
import PaymentsView from 'src/components/PaymentsView';
import { ROUTE_PATH } from 'src/constants';
import useOrderDetail from 'src/hooks/useOrderDetail';
import styles from './index.module.scss';

function OrderDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const orderId = location.pathname.split('/').at(-1) ?? null;

  const { orderDetailData } = useOrderDetail({ orderId });

  if (!orderDetailData) {
    navigate(ROUTE_PATH.ORDER);
    return <div />;
  }

  return (
    <ContentLayout title="주문 내역 상세">
      <ErrorBoundary fallback={<FetchFail />}>
        <Suspense
          fallback={
            <div className={styles['loading-container']}>
              <LoadingSpinner size="medium" />
            </div>
          }
        >
          <section className={styles['main-view']}>
            <div>
              <OrderItem
                order={{
                  id: orderDetailData.id,
                  orderTime: orderDetailData.orderTime,
                  productList: orderDetailData.productList,
                }}
              />
            </div>
            <PaymentsView paymentAmount={orderDetailData.paymentAmount} puschaseOption={false} />
          </section>
        </Suspense>
      </ErrorBoundary>
    </ContentLayout>
  );
}

export default OrderDetail;
