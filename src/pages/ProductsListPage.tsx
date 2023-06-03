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
      <ErrorBoundary key={serverName} fallback={<Message type="error" />}>
        <Suspense fallback={<Message type="loading" />}>
          <ProductList />
        </Suspense>
      </ErrorBoundary>
    </Main>
  );
};

const Main = styled.main`
  width: 100%;
  padding: 30px 30px 90px 30px;
`;

export default ProductsListPage;
