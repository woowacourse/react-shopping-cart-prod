import { Outlet } from 'react-router-dom';
import { Header } from '@layout/Header';
import { Container } from '@styles/style';

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
