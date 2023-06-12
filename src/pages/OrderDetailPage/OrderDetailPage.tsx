import { OrderDetail } from "@views/Payment/components/OrderDetail";
import { Suspense } from "react";
import { useParams } from "react-router-dom";
import ErrorBoundary from "@common/ErrorBoundary/ErrorBoundary";

function OrderDetailPage() {
  const { orderId } = useParams();

  return (
    <main>
      <ErrorBoundary>
        <Suspense>
          <OrderDetail orderId={Number(orderId)} />
        </Suspense>
      </ErrorBoundary>
    </main>
  );
}

export default OrderDetailPage;
