import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Header from 'components/Layout/Header/Header';

const Layout = () => {
  return (
    <>
      <Header />
      <MainContainer>
        <Outlet />
      </MainContainer>
    </>
  );
};

const MainContainer = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 60px 0;
  padding: 0 16.66%;

  @media (max-width: 1280px) {
    padding: 0 8.33%;
  }

  @media (max-width: 768px) {
    padding: 0 4.16%;
    margin-top: 20px;
    margin-bottom: 0;
  }
`;

export default Layout;
