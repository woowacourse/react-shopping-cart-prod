import { Suspense, lazy } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { styled } from 'styled-components';
import { Loading } from '../components/common/Spinner/Loading';
import ErrorDisplay from '../components/ErrorDisplay';

const ProductPageContent = lazy(() => import('../components/product/ProductPageContent'));

export default function Home() {
  return (
    <Style.Main>
      <Style.Content>
        <ErrorBoundary FallbackComponent={ErrorDisplay}>
          <Suspense fallback={<Loading />}>
            <ProductPageContent />
          </Suspense>
        </ErrorBoundary>
      </Style.Content>
    </Style.Main>
  );
}

const Style = {
  Main: styled.main`
    display: flex;
    justify-content: center;

    width: 100%;
    min-width: 992px;

    padding: 140px 30px 60px 30px;

    /* 태블릿 */
    @media screen and (max-width: 991px) {
      min-width: 768px;
    }

    /* 모바일 */
    @media screen and (max-width: 767px) {
      min-width: 375px;
    }
  `,

  Content: styled.div`
    width: 932px;

    /* 태블릿 */
    @media screen and (max-width: 991px) {
      width: 708px;
    }

    /* 모바일 */
    @media screen and (max-width: 767px) {
      width: 315px;
    }
  `,
};
