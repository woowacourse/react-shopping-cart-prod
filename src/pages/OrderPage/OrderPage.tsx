import { Container } from "@styles/style";

import { OrderList } from "@views/Payment/components/OrderList";
import { Suspense } from "react";
import ErrorBoundary from "@common/ErrorBoundary/ErrorBoundary";

function OrderPage() {
  return (
    <Container>
      <ErrorBoundary>
        <Suspense>
          <OrderList />
        </Suspense>
      </ErrorBoundary>
    </Container>
  );
}

export default OrderPage;
