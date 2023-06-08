import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import styled from 'styled-components';

import ActionMessage from '../components/Common/ActionMessage';
import ContentListSkeleton from '../components/Common/ContentListSkeleton';
import ProductList from '../components/Product/ProductList';

const ProductsListPage = () => {
  return (
    <Main>
      <ErrorBoundary fallback={<ActionMessage type='error' />}>
        <Suspense fallback={<ContentListSkeleton content='product' />}>
          <ProductList />
        </Suspense>
      </ErrorBoundary>
    </Main>
  );
};

const Main = styled.main`
  max-width: 1300px;
  margin: 60px auto 0;
  padding: 0 0 100px 0;
`;

export default ProductsListPage;
