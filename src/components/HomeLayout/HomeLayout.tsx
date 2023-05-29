import { Outlet } from 'react-router-dom';
import Header from '../Header';
import { Container } from '../../style/style';
import { ModalContainer } from '../ModalContainer';

function HomeLayout() {
  return (
    <>
      <Header />
      <Container>
        <Outlet />
      </Container>
      <ModalContainer />
    </>
  );
}

export default HomeLayout;
