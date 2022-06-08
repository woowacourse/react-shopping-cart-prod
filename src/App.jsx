import { useRoutes } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import routes from './routes/Routes';
import Header from './components/Header';

import { getCartItemAsync } from './store/cart/cart.actions';
import { STORAGE_KEY } from './constants';

function App() {
  const content = useRoutes(routes);
  const dispatch = useDispatch();

  const accessToken = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (accessToken) {
    dispatch(getCartItemAsync(accessToken));
  }

  return (
    <>
      <Header />
      {content}
    </>
  );
}

export default App;
