import { BrowserRouter } from 'react-router-dom';
import styled from 'styled-components';
import Header from 'components/Header';
import Router from 'Router';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { autoSignIn } from 'redux/action-creators/userThunk';
import { UserAction } from 'redux/actions/user';
import { KEYS } from 'utils/localStorage';
import SnackBar from 'components/@common/snackBar';
import { useDispatch } from 'react-redux';
import { updateSnackBar } from 'redux/actions/snackBar';
import ErrorBoundary from 'components/@common/ErrorBoundary';
import { Suspense } from 'react';
import Loading from 'components/@common/Loading';
import { MESSAGE } from 'constant/message';

function App() {
  const dispatch = useDispatch();
  const thunkDispatch = useAppDispatch<UserAction>();

  if (localStorage.getItem(KEYS.TOKEN)) {
    try {
      thunkDispatch(autoSignIn());
    } catch (error) {
      dispatch(updateSnackBar(MESSAGE.FAILED_AUTO_SIGN));
    }
  }

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <StyledRoot>
        <Header />
        <StyledMain>
          <ErrorBoundary fallback={MESSAGE.PAGE_ERROR}>
            <Suspense fallback={<Loading />}>
              <Router />
            </Suspense>
          </ErrorBoundary>
        </StyledMain>
        <SnackBar />
      </StyledRoot>
    </BrowserRouter>
  );
}

export default App;

const StyledRoot = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledMain = styled.main`
  width: ${({ theme }) => theme.size.fullContentWidth};
`;
