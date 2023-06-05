import { ErrorBoundary, Header, OrderDetailContent, Page } from "../components";

export const OrderDetail = () => {
  return (
    <>
      <Header />
      <Page>
        <ErrorBoundary>
          <OrderDetailContent />
        </ErrorBoundary>
      </Page>
    </>
  );
};
