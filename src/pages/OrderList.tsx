import Header from "components/Header";
import Page from "components/common/Page";
import React from "react";
import Skeleton from "components/common/Skeleton";
import OrderDetailList from "components/orderList/OrderDetailList";
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
          <OrderDetailList />
        </React.Suspense>
      </Page>
    </>
  );
};

export default OrderList;
