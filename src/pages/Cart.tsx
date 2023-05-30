import Header from "components/Header";
import Page from "components/common/Page";
import CartItemList from "components/CartItemList";
import PurchaseOrder from "components/PurchaseOrder";
import React from "react";
import Skeleton from "components/common/Skeleton";
import LoadingSpinner from "components/common/LoadingSpinner";

const Cart = () => {
  return (
    <>
      <React.Suspense
        fallback={<Skeleton {...{ background: "#333333", width: "100%", height: "70px" }} />}
      >
        <Header />
      </React.Suspense>
      <Page>
        <React.Suspense fallback={<LoadingSpinner />}>
          <CartItemList />
          <PurchaseOrder />
        </React.Suspense>
      </Page>
    </>
  );
};

export default Cart;
