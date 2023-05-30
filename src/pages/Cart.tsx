import Header from "components/Header";
import Page from "components/common/Page";
import CartItemList from "components/CartItemList";
import PurchaseOrder from "components/PurchaseOrder";
import React from "react";
import LoadingSpinner from "components/common/LoadingSpinner";

const Cart = () => {
  return (
    <Page pageName="장바구니">
      <React.Suspense fallback={<LoadingSpinner />}>
        <div style={{ display: "flex" }}>
          <CartItemList />
          <PurchaseOrder />
        </div>
      </React.Suspense>
    </Page>
  );
};

export default Cart;
