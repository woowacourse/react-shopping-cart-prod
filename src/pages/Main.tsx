import { ErrorBoundary } from 'react-error-boundary';
import { ProductCardGrid } from '../components/mainPage/productCardGrid/ProductCardGrid';
import { Layout } from '../layout';
import { Fallback } from '../components/error/Fallback';
import { errorMessage } from '../constants/errorMessage';

function Main() {
  return (
    <Layout>
      <ErrorBoundary
        FallbackComponent={() => (
          <Fallback error={new Error(errorMessage.PRODUCT_ITEMS_FETCH_ERROR)} />
        )}
      >
        <ProductCardGrid />
      </ErrorBoundary>
    </Layout>
  );
}

export default Main;
