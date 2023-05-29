import { styled } from 'styled-components';
import { Outlet } from 'react-router-dom';
import Header from './components/common/Header/Header';
import { Suspense } from 'react';
import HeaderFallback from './components/common/Header/HeaderFallback';

function App() {
  return (
    <div className="App">
      <Suspense fallback={<HeaderFallback />}>
        <Header />
      </Suspense>
      <Layout>
        <Outlet />
      </Layout>
    </div>
  );
}

const Layout = styled.main`
  padding: 120px 0 60px 0;

  @media screen and (min-width: 1200px) {
    display: flex;
    justify-content: center;
  }
`;

export default App;
