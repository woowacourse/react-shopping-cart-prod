import routes from 'Routes';
import GlobalStyle from 'style/globalStyle';
import StyleTheme from 'style/theme';
import SnackBar from 'components/Common/SnackBar/SnackBar';
import { useRoutes } from 'react-router-dom';

function App() {
  const element = useRoutes(routes);
  return (
    <StyleTheme>
      <GlobalStyle />
      {element}
      <SnackBar />
    </StyleTheme>
  );
}

export default App;
