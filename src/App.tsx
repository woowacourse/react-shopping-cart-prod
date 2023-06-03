import { Outlet } from 'react-router-dom';

import Header from './components/Common/Header';
import Toast from './components/Common/Toast';
import { styled } from 'styled-components';

function App() {
  return (
    <StyledApp>
      <Header />
      <Outlet />
      <Toast />
    </StyledApp>
  );
}

const StyledApp = styled.div`
  width: 100vw;
  height: 100%;

  overflow-y: auto;
`;

export default App;
