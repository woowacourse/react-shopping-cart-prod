import { Header } from '@layout/Header';
import { Container } from '@styles/style';
import { Outlet } from 'react-router-dom';

function HomeLayout() {
  return (
    <>
      <Header />
      <Container>
        <Outlet />
      </Container>
    </>
  );
}

export default HomeLayout;
