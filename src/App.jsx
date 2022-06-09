import { useRoutes } from 'react-router-dom';
import routes from './routes/Routes';
import './store/index';
import Header from './components/Header';
import GlobalStyles from './styles/GlobalStyles';

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
