import { useRoutes } from 'react-router-dom';

import Header from './components/Header';

import GlobalStyles from './styles/GlobalStyles';
import routes from './routes/Routes';
import './store/index';

function App() {
  const content = useRoutes(routes);

  return (
    <>
      <GlobalStyles />
      <Header />
      {content}
    </>
  );
}

export default App;
