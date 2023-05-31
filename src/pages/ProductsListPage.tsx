import { Suspense } from 'react';
import styled from 'styled-components';
import { ErrorBoundary } from 'react-error-boundary';
import Message from '../components/Common/Message';
import ContentListSkeleton from '../components/Common/ContentListSkeleton';
import ProductList from '../components/Product/ProductList';

const ProductsListPage = () => {
  return (
    <>
      <Main>
        <ErrorBoundary fallback={<Message type='error' />}>
          <Suspense fallback={<ContentListSkeleton content='product' />}>
            <ProductList />
          </Suspense>
        </ErrorBoundary>
      </Main>
    </>
  );
};

const Main = styled.main`
  max-width: 1300px;
  margin: 60px auto 0;
  padding: 0 0 100px 0;
`;

export default ProductsListPage;
