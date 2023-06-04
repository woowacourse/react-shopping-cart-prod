import { Header, Page, ProductList } from "../components";
import { ErrorBoundary } from "../components/index";

const Main = () => {
  return (
    <>
      <Header />
      <Page>
        <ErrorBoundary>
          <ProductList />
        </ErrorBoundary>
      </Page>
    </>
  );
};

export default Main;
