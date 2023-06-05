import { Suspense } from 'react';
import ContentLayout from 'src/components/Common/ContentLayout';
import LoadingSpinner from 'src/components/Common/LoadingSpinner';
import ErrorBoundary from 'src/components/ErrorBoundary';
import FetchFail from 'src/components/FetchFail';
import ProductItemList from 'src/components/ProductItemList';
import styles from './index.module.scss';

function Home() {
  return (
    <ErrorBoundary fallback={<FetchFail />}>
      <ContentLayout>
        <Suspense
          fallback={
            <div className={styles['spinner-container']}>
              <LoadingSpinner size="medium" />
            </div>
          }
        >
          <ProductItemList />
        </Suspense>
      </ContentLayout>
    </ErrorBoundary>
  );
}

export default Home;
