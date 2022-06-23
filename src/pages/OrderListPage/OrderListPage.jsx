import { useEffect } from "react";

import PageTitle from "@components/PageTitle";
import OrderTable from "./components/OrderTable";

import { useFetch } from "../../hooks/useFetch";
import { API_SERVER, FETCH_STATUS, REQUEST_METHOD } from "../../constants";

import PageLoader from "../../components/PageLoader";
import PageErrorResult from "../../components/PageErrorResult";

function OrderListPage() {
  const {
    fetch: getOrderList,
    data: orderList,
    status,
    error,
  } = useFetch({
    method: REQUEST_METHOD.GET,
    url: `${API_SERVER.BASE_URL}${API_SERVER.PATH.MY_ORDERS}`,
    initialData: [],
  });

  useEffect(() => {
    getOrderList();
  }, []);

  if (status === FETCH_STATUS.PENDING || !orderList) return <PageLoader />;
  if (status === FETCH_STATUS.FAIL)
    return <PageErrorResult errorMessage={error.message} />;

  return (
    <div className="wrapper">
      <div>
        <PageTitle className="mb-50">주문목록</PageTitle>
        <div>
          {orderList.map((order) => (
            <OrderTable
              key={order.id}
              orderId={order.id}
              orderedProducts={order.orderedProducts}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default OrderListPage;
