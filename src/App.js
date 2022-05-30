import routes from 'Routes';
import GlobalStyle from 'style/globalStyle';
import StyleTheme from 'style/theme';
import { useRoutes } from 'react-router-dom';

function App() {
  const element = useRoutes(routes);
  return (
    <StyleTheme>
      <GlobalStyle />
      {element}
    </StyleTheme>
  );
}

export default App;
