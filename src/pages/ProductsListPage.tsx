import styled from 'styled-components';
import { ErrorBoundary } from 'react-error-boundary';

import Message from '../components/Common/Message';
import ContentListSkeleton from '../components/Common/ContentListSkeleton';

const ProductsListPage = () => {
  return (
    <>
      <Main>
        <ErrorBoundary fallback={<Message type='error' />}>
          <ContentListSkeleton content='product' />
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
