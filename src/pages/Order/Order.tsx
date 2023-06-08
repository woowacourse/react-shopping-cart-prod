import { ErrorBoundary } from "react-error-boundary";
import OrderList from "../../components/OrderList";
import BigAlert from "../../components/BigAlert";

function Order() {
  return (
    <ErrorBoundary fallback={<BigAlert title="앗" message="주문 목록을 불러오는 도중 문제가 발생했습니다." />}>
      <OrderList />
    </ErrorBoundary>
  );
}

export default Order;
