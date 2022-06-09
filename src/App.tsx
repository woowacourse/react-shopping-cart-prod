import { Routes, Route } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';

import AuthPage from 'pages/AuthPage/AuthPage';
import CartPage from 'pages/CartPage/CartPage';
import MainPage from 'pages/MainPage/MainPage';
import NotFoundPage from 'pages/NotFoundPage/NotFoundPage';
import ProductPage from 'pages/ProductPage/ProductPage';
import ProfilePage from 'pages/ProfilePage/ProfilePage';
import SigninPage from 'pages/SigninPage/SigninPage';
import SignupPage from 'pages/SignupPage/SignupPage';

import Header from 'components/Header/Header';

import GlobalStyle from 'styles/GlobalStyle';
import theme from 'styles/theme';

import { PATHS } from 'constants/paths';

function App() {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Header />
        <StyledContent>
          <Routes>
            <Route path={PATHS.INDEX} element={<MainPage />} />
            <Route path={PATHS.PRODUCT} element={<ProductPage />} />
            <Route
              path={PATHS.CART}
              element={<AuthPage element={<CartPage />} />}
            />
            <Route path={PATHS.SIGNIN} element={<SigninPage />} />
            <Route path={PATHS.SIGNUP} element={<SignupPage />} />
            <Route
              path={PATHS.CART}
              element={<AuthPage element={<ProfilePage />} />}
            />
            <Route path={PATHS.DEFAULT} element={<NotFoundPage />} />
          </Routes>
        </StyledContent>
      </ThemeProvider>
    </>
  );
}

const StyledContent = styled.div`
  min-height: 200px;
  margin: 60px 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export default App;
