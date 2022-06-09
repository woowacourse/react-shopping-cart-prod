import Header from 'components/common/Header';
import Loading from 'components/common/Loading';
import useUser from 'hooks/useUser';
import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routers from 'Routers';
import styled from 'styled-components';

function App() {
  useUser();

  return (
    <Suspense fallback={<Loading />}>
      <BrowserRouter basename='/react-shopping-cart'>
        <StyledRoot>
          <Header />
          <StyledMain>
            <Routers />
          </StyledMain>
        </StyledRoot>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;

const StyledRoot = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  flex: 1;
`;

const StyledMain = styled.main`
  width: ${({ theme }) => theme.size.fullContentWidth};
  display: flex;
  justify-content: center;
  flex: 1;
`;
