import { RouterProvider } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';
import router from './router';
import GlobalStyle from './styles/GlobalStyle';
import ResetStyle from './styles/ResetStyle';
import { theme } from './styles/Theme';

const App = () => {
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <ResetStyle />
        <GlobalStyle />
        <RouterProvider router={router} />
      </ThemeProvider>
    </RecoilRoot>
  );
};

export default App;
