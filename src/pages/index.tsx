import { Outlet } from 'react-router-dom';

import Header from '../components/Common/Header';
import Toast from '../components/Common/Toast';
import styled from 'styled-components';

const App = () => (
  <>
    <Header />
    <Main>
      <Outlet />
    </Main>
    <Toast />
  </>
);

const Main = styled.main`
  position: relative;

  max-width: 1300px;
  height: calc(100% - 80px);
  margin: 0 auto;
  padding: 40px 20px 0;
  overflow-y: auto;
`;

export default App;
