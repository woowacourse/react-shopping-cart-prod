import { Suspense } from 'react';
import { useRecoilValue } from 'recoil';
import { ErrorBoundary } from 'react-error-boundary';
import styled from 'styled-components';

import Header from '../components/Common/Header';
import Message from '../components/Common/Message';
import ProductList from '../components/Product/ProductList';

import { serverNameState } from '../states/serverName';

const ProductsListPage = () => {
  const serverName = useRecoilValue(serverNameState);

  return (
    <>
      <Header />
      <Main>
        <ErrorBoundary key={serverName} fallback={<Message type='error' />}>
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
