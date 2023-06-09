import { Outlet, useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import Header from '../components/Header';

const Content = styled.main`
  margin: 0 auto;
  margin-top: 60px;
`;

const RootPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header onNavigate={navigate} />
      <Content>
        <Outlet />
      </Content>
    </>
  );
};

export default RootPage;
