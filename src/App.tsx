import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import Error from './components/common/Error/Error';
import ErrorBoundary from './components/common/ErrorBoundary/ErrorBoundary';
import ErrorModal from './components/common/ErrorModal/ErrorModal';
import Header from './components/common/Header/Header';
import SpinnerContainer from './components/common/SpinnerContainer/SpinnerContainer';
import { useErrorReset } from './hooks/common/useErrorReset';

const App = () => {
  const { handleErrorReset } = useErrorReset();

  return (
    <Suspense fallback={<SpinnerContainer />}>
      <ErrorBoundary Fallback={Error} onReset={handleErrorReset}>
        <Header />
        <main>
          <Outlet />
        </main>
        <ErrorModal />
      </ErrorBoundary>
    </Suspense>
  );
};

export default App;
