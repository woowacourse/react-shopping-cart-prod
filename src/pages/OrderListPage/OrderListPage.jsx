import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import cn from "classnames";

import { getOrderList } from "@redux/reducers/order-list-reducer/orderListThunks";

import PageTitle from "@components/PageTitle";
import OrderTable from "./components/OrderTable/OrderTable";

import styles from "./OrderListPage.module";

function OrderListPage() {
  const dispatch = useDispatch();

  const { isLoading, isError, orderList } = useSelector((state) => ({
    ...state.orderList.query.getOrderList,
    orderList: state.orderList.data,
  }));

  console.log("orderList in OrderListPage.jsx : ", orderList);

  useEffect(() => {
    dispatch(getOrderList());
  }, [dispatch]);

  if (isLoading) return <div>...loading</div>;

  if (!orderList) return <div>...loading</div>;

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
