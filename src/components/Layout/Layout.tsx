import { Outlet } from 'react-router-dom';
import { Header } from '../Header';
import { Container } from '../../style/style';
import { ModalContainer } from './ModalContainer';
import { Suspense } from 'react';
import { LoadingSpinner } from '../@common/LoadingSpinner';
import { Wrapper } from './Layout.style';

function Layout() {
  return (
    <>
      <Header />
      <Container>
        <Suspense
          fallback={
            <Wrapper>
              <LoadingSpinner />
            </Wrapper>
          }
        >
          <Outlet />
        </Suspense>
      </Container>
      <ModalContainer />
    </>
  );
}

export default Layout;
