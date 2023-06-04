import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import Message from '../components/Common/Message';
import ProductList from '../components/Product/ProductList';
import ErrorMessage from '../components/Common/ErrorMessage';
import { serverNameState } from '../states/serverName';

const ProductsListPage = () => {
  const serverName = useRecoilValue(serverNameState);

  return (
    <Main>
      <ErrorBoundary
        key={serverName}
        fallback={<ErrorMessage type='product' />}
      >
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
