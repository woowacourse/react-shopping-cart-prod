import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import SvgSprite from './components/@common/Svg/SvgSprite';
import router from './router';
import GlobalStyle from './styles/GlobalStyle';
import theme from './styles/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <RouterProvider router={router} />
      <SvgSprite />
    </ThemeProvider>
  );
}

export default App;
