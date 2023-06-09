import { ErrorBoundary } from 'react-error-boundary';
import { ProductCardGrid } from '../components/mainPage/productCardGrid/ProductCardGrid';
import { Layout } from '../layout';
import { Fallback } from '../components/error/Fallback';

function Main() {
  return (
    <Layout>
      <ErrorBoundary FallbackComponent={Fallback}>
        <ProductCardGrid />
      </ErrorBoundary>
    </Layout>
  );
}

export default Main;
