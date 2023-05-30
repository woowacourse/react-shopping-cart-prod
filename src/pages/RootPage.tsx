import { Outlet, useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import AppBar from '../components/AppBar';

const Content = styled.main`
  margin: 0 auto;
  margin-top: 60px;
  padding: 0 24px;

  max-width: 1300px;
`;

const RootPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <AppBar onNavigate={navigate} />
      <Content>
        <Outlet />
      </Content>
    </>
  );
};

export default RootPage;
