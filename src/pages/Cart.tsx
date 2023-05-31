import Page from "components/common/Page";
import CartItemList from "components/CartItemList";
import PurchaseOrder from "components/PurchaseOrder";
import LoadingSpinner from "components/common/LoadingSpinner";
import AsyncBoundary from "components/common/AsyncBoundary";
import ErrorInfo from "components/common/ErrorInfo";

const Cart = () => {
  return (
    <Page pageName="장바구니">
      <AsyncBoundary
        SuspenseFallback={<LoadingSpinner />}
        ErrorFallback={() => <ErrorInfo size="L" />}
      >
        <div style={{ display: "flex" }}>
          <CartItemList />
          <PurchaseOrder />
        </div>
      </AsyncBoundary>
    </Page>
  );
};

export default Cart;
