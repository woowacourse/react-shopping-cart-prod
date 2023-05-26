import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import styled from 'styled-components';

import Message from '../components/Common/Message';
import ProductList from '../components/Product/ProductList';

import useFetchCartProducts from '../hooks/useFetchCartProducts';

const ProductsListPage = () => {
  const serverName = useFetchCartProducts();

  return (
    <Main>
      <ErrorBoundary key={serverName} fallback={<Message type='error' />}>
        <Suspense fallback={<Message type='loading' />}>
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
