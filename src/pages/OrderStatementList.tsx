import { getOrderStatement } from "api/orders";
import Header from "components/Header";
import OrderStatement from "components/OrderStatement";
import LoadingSpinner from "components/common/LodingSpinner";
import Page from "components/common/Page";
import Skeleton from "components/common/Skeleton";
import { Suspense, useEffect, useState } from "react";
import { EachOrderStatement } from "types/domain";

const OrderStatementList = () => {
  const [orderStatementList, setOrderStatementList] = useState<
    EachOrderStatement[]
  >([]);

  useEffect(() => {
    getOrderStatement().then((res) => {
      if (!res) return alert("주문목록 불러오기 실패!");

      setOrderStatementList(res);
    });
  }, []);

  return (
    <>
      <Suspense
        fallback={
          <Skeleton
            {...{ background: "#333333", width: "100%", height: "70px" }}
          />
        }
      >
        <Header />
      </Suspense>
      <Page pageName="주문내역">
        <Suspense fallback={<LoadingSpinner />}>
          {orderStatementList.map((order) => (
            <OrderStatement
              key={order.orderId}
              orderId={order.orderId}
              orders={order.orderItems}
            ></OrderStatement>
          ))}
        </Suspense>
      </Page>
    </>
  );
};

export default OrderStatementList;
