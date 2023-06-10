import Header from "components/Header";
import Page from "components/common/Page";
import ItemList from "components/main/ItemList";
import React from "react";
import LoadingSpinner from "components/common/LoadingSpinner";
import Skeleton from "components/common/Skeleton";
import { ErrorBoundary } from "react-error-boundary";
import Fallback from "./Fallback";

const Main = () => {
  return (
    <ErrorBoundary FallbackComponent={Fallback}>
      <React.Suspense
        fallback={<Skeleton {...{ background: "#333333", width: "100%", height: "70px" }} />}
      >
        <Header />
      </React.Suspense>
      <Page>
        <React.Suspense fallback={<LoadingSpinner />}>
          <ItemList />
        </React.Suspense>
      </Page>
    </ErrorBoundary>
  );
};

export default Main;
