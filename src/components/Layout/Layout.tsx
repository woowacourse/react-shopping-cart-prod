import { Outlet } from 'react-router-dom';
import { Header } from '../Header';
import { Container } from '../../style/style';
import { ModalContainer } from './ModalContainer';
import { Suspense } from 'react';

function Layout() {
  return (
    <>
      <Header />
      <Container>
        <Suspense fallback={<div>로딩중</div>}>
          <Outlet />
        </Suspense>
      </Container>
      <ModalContainer />
    </>
  );
}

export default Layout;
