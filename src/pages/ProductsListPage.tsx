import styled from 'styled-components';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import Header from '../components/Common/Header';
import ProductList from '../components/Product/ProductList';
import Message from '../components/Common/Message';

const ProductsListPage = () => {
  return (
    <>
      <Header />
      <Main>
        <ErrorBoundary fallback={<Message type='error' />}>
          <Suspense fallback={<Message type='loading' />}>
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
