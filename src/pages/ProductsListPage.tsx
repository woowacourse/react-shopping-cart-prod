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
    <ProductListSection>
      <ErrorBoundary
        key={serverName}
        fallback={<ErrorMessage type='product' />}
      >
        <Suspense fallback={<Message type='loading' />}>
          <ProductList />
        </Suspense>
      </ErrorBoundary>
    </ProductListSection>
  );
};

const ProductListSection = styled.section`
  padding: 0 0 60px;
`;

export default ProductsListPage;
