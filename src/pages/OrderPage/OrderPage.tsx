import { Container } from '@styles/style';

import { OrderList } from '@views/Payment/components/OrderList';
import { Suspense } from 'react';

function OrderPage() {
  return (
    <Container>
      <Suspense fallback={<h1>고생하셨어요.</h1>}>
        <OrderList />
      </Suspense>
    </Container>
  );
}

export default OrderPage;
