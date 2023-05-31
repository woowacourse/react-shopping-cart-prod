import Header from "components/Header";
import Page from "components/common/Page";
import React from "react";
import Skeleton from "components/common/Skeleton";
import OrderItemList from "components/OrderDetailList";

const OrderList = () => {
  return (
    <>
      <React.Suspense
        fallback={<Skeleton {...{ background: "#333333", width: "100%", height: "70px" }} />}
      >
        <Header />
      </React.Suspense>
      <Page>
        <OrderItemList />
      </Page>
    </>
  );
};

export default OrderList;
