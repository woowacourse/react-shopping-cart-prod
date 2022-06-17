import { useEffect } from "react";
import cn from "classnames";

import PageTitle from "@components/PageTitle";
import OrderTable from "./components/OrderTable";

import { useFetch } from "../../hooks/useFetch";
import { API_SERVER, FETCH_STATUS, REQUEST_METHOD } from "../../constants";

import styles from "./OrderListPage.module";

function OrderListPage() {
  const {
    fetch: getOrderList,
    data: orderList,
    status,
    error,
  } = useFetch(
    REQUEST_METHOD.GET,
    `${API_SERVER.BASE_URL}${API_SERVER.PATH.MY_ORDERS}`,
    []
  );

  useEffect(() => {
    getOrderList();
  }, []);

  if (status === FETCH_STATUS.PENDING || !orderList)
    return <div>...Loading</div>;
  if (status === FETCH_STATUS.FAIL) return <div>ERROR!! : {error.message}</div>;

  return (
    <div className="wrapper">
      <div className={cn(styles.orderList)}>
        <PageTitle className="mb-50">주문목록</PageTitle>
        <div className={styles.container}>
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
