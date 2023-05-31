import Page from "components/common/Page";
import ItemList from "components/ItemList";
import LoadingSpinner from "components/common/LoadingSpinner";
import AsyncBoundary from "components/common/AsyncBoundary";
import ErrorInfo from "components/common/ErrorInfo";

const Main = () => {
  return (
    <Page>
      <AsyncBoundary
        SuspenseFallback={<LoadingSpinner />}
        ErrorFallback={() => <ErrorInfo size="L" />}
      >
        <ItemList />
      </AsyncBoundary>
    </Page>
  );
};

export default Main;
