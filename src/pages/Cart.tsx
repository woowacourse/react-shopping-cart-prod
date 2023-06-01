import Header from "components/Header";
import Page from "components/common/Page";
import CartItemList from "components/cart/CartItemList";
import PurchaseOrder from "components/cart/PurchaseOrder";
import React from "react";
import Skeleton from "components/common/Skeleton";
import LoadingSpinner from "components/common/LoadingSpinner";
import { ErrorBoundary } from "react-error-boundary";
import Fallback from "./Fallback";

const Cart = () => {
  return (
    <ErrorBoundary FallbackComponent={Fallback}>
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
    </ErrorBoundary>
  );
};

export default Cart;
