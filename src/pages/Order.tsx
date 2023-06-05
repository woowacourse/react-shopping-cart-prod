import { Header, Page, OrderListContent, ErrorBoundary } from "../components";

const Order = () => {
  return (
    <>
      <Header />
      <Page>
        <ErrorBoundary>
          <OrderListContent />
        </ErrorBoundary>
      </Page>
    </>
  );
};

export default Order;
