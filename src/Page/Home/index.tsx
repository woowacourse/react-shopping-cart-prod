import ProductItemList from 'src/components/ProductItemList';
import ContentLayout from 'src/components/Common/ContentLayout';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { Suspense } from 'react';
import LoadingSpinner from 'src/components/Common/LoadingSpinner';
import FetchFail from 'src/components/FetchFail';
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
