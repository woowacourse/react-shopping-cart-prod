import Header from "components/Header";
import Page from "components/common/Page";
import React from "react";
import Skeleton from "components/common/Skeleton";
import LoadingSpinner from "components/common/LoadingSpinner";
import { Outlet } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import Fallback from "./Fallback";

const OrderList = () => {
  return (
    <ErrorBoundary FallbackComponent={Fallback}>
      <React.Suspense
        fallback={<Skeleton {...{ background: "#333333", width: "100%", height: "70px" }} />}
      >
        <Header />
      </React.Suspense>
      <Page>
        <React.Suspense fallback={<LoadingSpinner />}>
          <Outlet />
        </React.Suspense>
      </Page>
    </ErrorBoundary>
  );
};

export default OrderList;
