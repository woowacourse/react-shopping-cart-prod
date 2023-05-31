import Header from "components/Header";
import Page from "components/common/Page";
import React from "react";
import Skeleton from "components/common/Skeleton";
import OrderDetailList from "components/orderList/OrderDetailList";

const OrderList = () => {
  return (
    <>
      <React.Suspense
        fallback={<Skeleton {...{ background: "#333333", width: "100%", height: "70px" }} />}
      >
        <Header />
      </React.Suspense>
      <Page>
        <OrderDetailList />
      </Page>
    </>
  );
};

export default OrderList;
