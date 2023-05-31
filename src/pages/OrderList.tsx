import Header from "components/Header";
import Page from "components/common/Page";
import React from "react";
import Skeleton from "components/common/Skeleton";
import OrderItemList from "components/orderList/OrderItemList";
import LoadingSpinner from "components/common/LoadingSpinner";

const OrderList = () => {
  return (
    <>
      <React.Suspense
        fallback={<Skeleton {...{ background: "#333333", width: "100%", height: "70px" }} />}
      >
        <Header />
      </React.Suspense>
      <Page>
        <React.Suspense fallback={<LoadingSpinner />}>
          <OrderItemList />
        </React.Suspense>
      </Page>
    </>
  );
};

export default OrderList;
