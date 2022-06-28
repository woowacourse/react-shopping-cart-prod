import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import Header from './components/Header';

import GlobalStyles from './styles/GlobalStyles';
import theme from './styles/theme';
import routes from './routes/Routes';
import './store/index';

function App() {
  const content = useRoutes(routes);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Header />
      {content}
    </ThemeProvider>
  );
}

export default App;
