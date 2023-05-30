import Page from "components/common/Page";
import ItemList from "components/ItemList";
import React from "react";
import LoadingSpinner from "components/common/LoadingSpinner";

const Main = () => {
  return (
    <Page>
      <React.Suspense fallback={<LoadingSpinner />}>
        <ItemList />
      </React.Suspense>
    </Page>
  );
};

export default Main;
