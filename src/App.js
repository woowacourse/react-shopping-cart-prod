import routes from 'Routes';
import GlobalStyle from 'style/globalStyle';
import StyleTheme from 'style/theme';
import SnackBar from 'components/Common/SnackBar/SnackBar';
import { useRoutes } from 'react-router-dom';
import useAuthentication from 'hooks/useAuthentication';
import { useEffect } from 'react';

function App() {
  const element = useRoutes(routes);
  const { checkIsAuthenticated } = useAuthentication();

  useEffect(() => {
    checkIsAuthenticated();
  }, []);

  return (
    <StyleTheme>
      <GlobalStyle />
      {element}
      <SnackBar />
    </StyleTheme>
  );
}

export default App;
