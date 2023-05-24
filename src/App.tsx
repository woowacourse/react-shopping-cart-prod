import { RecoilRoot } from 'recoil';
import Router from './routes/Router';
import { Suspense } from 'react';
import LoadingView from './components/Common/LoadingView';

function App() {
  return (
    <RecoilRoot>
      <Suspense fallback={<LoadingView />}>
        <Router />
      </Suspense>
    </RecoilRoot>
  );
}

export default App;
