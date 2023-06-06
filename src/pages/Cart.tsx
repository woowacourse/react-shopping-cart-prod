import Page from "components/common/Page";
import CartItemList from "components/CartItemList";
import PurchaseOrder from "components/PurchaseOrder";
import AsyncBoundary from "components/common/AsyncBoundary";
import ErrorInfo from "components/common/ErrorInfo";
import CartItemListSkeleton from "components/skeleton/CartItemListSkeleton";

const Cart = () => {
  return (
    <Page pageName="장바구니">
      <div style={{ display: "flex" }}>
        <AsyncBoundary
          SuspenseFallback={<CartItemListSkeleton />}
          ErrorFallback={(FallbackProps) => (
            <ErrorInfo error={FallbackProps.error} />
          )}
        >
          <CartItemList />
          <PurchaseOrder />
        </AsyncBoundary>
      </div>
    </Page>
  );
};

export default Cart;
