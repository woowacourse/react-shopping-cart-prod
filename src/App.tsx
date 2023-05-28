import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import SvgSprite from './components/@common/Svg/SvgSprite';
import { useToast } from 'components/@common/Toast/hooks/useToast';
import router from './router';
import GlobalStyle from './styles/GlobalStyle';
import theme from './styles/theme';

function App() {
  const { renderToast } = useToast();

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <RouterProvider router={router} />
      {renderToast}
      <SvgSprite />
    </ThemeProvider>
  );
}

export default App;
