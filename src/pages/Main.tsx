import { Suspense } from "react";
import { Header, Loading, Page, ProductList } from "../components";
import { ErrorBoundary } from "../components/index";

const Main = () => {
  return (
    <Suspense fallback={<Loading />}>
      <ErrorBoundary>
        <Header />
        <Page>
          <ProductList />
        </Page>
      </ErrorBoundary>
    </Suspense>
  );
};

export default Main;
