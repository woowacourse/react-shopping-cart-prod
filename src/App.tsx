import { BrowserRouter } from 'react-router-dom';
import styled from 'styled-components';
import Header from 'components/Header';
import Router from 'Router';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { autoSignIn } from 'redux/action-creators/userThunk';
import { UserAction } from 'redux/actions/user';
import { KEYS } from 'utils/localStorage';
import SnackBar from 'components/common/snackBar';

function App() {
  const dispatch = useAppDispatch<UserAction>();

  if (localStorage.getItem(KEYS.TOKEN)) {
    dispatch(autoSignIn());
  }

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <StyledRoot>
        <Header />
        <StyledMain>
          <Router />
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
