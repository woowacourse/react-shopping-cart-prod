import OrderList from 'src/components/OrderList';
import ContentLayout from 'src/components/Common/ContentLayout';
import { Suspense } from 'react';
import LoadingSpinner from 'src/components/Common/LoadingSpinner';
import ErrorBoundary from 'src/components/ErrorBoundary';
import FetchFail from 'src/components/FetchFail';
import styles from './index.module.scss';

function Order() {
  return (
    <ContentLayout title="주문 목록">
      <ErrorBoundary fallback={<FetchFail />}>
        <Suspense
          fallback={
            <div className={styles['loading-container']}>
              <LoadingSpinner size="medium" />
            </div>
          }
        >
          <OrderList />
        </Suspense>
      </ErrorBoundary>
    </ContentLayout>
  );
}

export default Order;
