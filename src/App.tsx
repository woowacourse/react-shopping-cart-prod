import Header from 'components/common/Header';
import Loading from 'components/common/Loading';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import { Suspense, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { getUser } from 'redux/user/thunk';
import Routers from 'Routers';
import styled from 'styled-components';
import { flexCenter } from 'styles/mixin';

function App() {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector(state => state.user);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  if (loading === 'getUser') return <Loading />;

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
