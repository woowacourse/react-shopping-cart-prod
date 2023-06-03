import { Container } from '@styles/style';

import { OrderList } from '@views/Payment/components/OrderList';
import { Suspense } from 'react';

function OrderPage() {
  return (
    <Container>
      <Suspense>
        <OrderList />
      </Suspense>
    </Container>
  );
}

export default OrderPage;
