import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useNavigate } from 'react-router-dom';

import { useOrderList } from '../../hooks/useFetchUrl';
import ErrorFallback from '../ErrorFallback/ErrorFallback';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import OrderItem from '../OrderItem/OrderItem';
import styles from './style.module.css';

const OrderList = () => {
  const orderList = useOrderList();

  return (
    <div className={styles.container}>
      {orderList?.map((orderItem) => (
        <OrderItem key={orderItem.id} information={orderItem} />
      ))}
    </div>
  );
};

const OrderListContainer = () => {
  const navigate = useNavigate();
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        navigate('/');
      }}
    >
      <Suspense fallback={<LoadingSpinner />}>
        <OrderList />
      </Suspense>
    </ErrorBoundary>
  );
};

export default OrderListContainer;
