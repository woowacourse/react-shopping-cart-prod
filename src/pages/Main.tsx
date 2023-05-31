import Page from "components/common/Page";
import ItemList from "components/ItemList";
import AsyncBoundary from "components/common/AsyncBoundary";
import ErrorInfo from "components/common/ErrorInfo";
import ItemListSkeleton from "components/skeleton/ItemListSkeleton";

const Main = () => {
  return (
    <Page>
      <AsyncBoundary
        SuspenseFallback={<ItemListSkeleton />}
        ErrorFallback={(FallbackProps) => (
          <ErrorInfo error={FallbackProps.error} />
        )}
      >
        <ItemList />
      </AsyncBoundary>
    </Page>
  );
};

export default Main;
