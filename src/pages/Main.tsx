import { Suspense } from "react";
import {
  ErrorBoundary,
  Header,
  Loading,
  Page,
  ProductList,
} from "../components";

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
