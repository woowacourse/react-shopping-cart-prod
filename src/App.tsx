import React from 'react';
import { Outlet } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { styled } from 'styled-components';
import Header from './components/Header/Header';
import OnLoading from './components/OnLoading/OnLoading';
import { WIDTH } from './styles/mediaQuery';
import { ErrorBoundary } from 'react-error-boundary';
import { serverAtom } from './store/server';
import ErrorComponent from './components/ErrorContainer/ErrorContainer';

const App = () => {
  const serverName = useRecoilValue(serverAtom);

  return (
    <React.Suspense fallback={<OnLoading />}>
      <Header />
      <ErrorBoundary key={serverName} fallback={<ErrorComponent />}>
        <Layout>
          <Outlet />
        </Layout>
      </ErrorBoundary>
    </React.Suspense>
  );
};

export default App;

const Layout = styled.div`
  display: flex;
  justify-content: center;

  padding: 32px 0px;

  width: 100%;
  min-width: ${WIDTH.SM};

  @media (max-width: ${WIDTH.LG}) {
    padding: 24px 0px;
  }
`;
