import { Outlet } from 'react-router-dom';

import Header from '../components/Common/Header';
import Toast from '../components/Common/Toast';

const App = () => (
  <>
    <Header />
    <Outlet />
    <Toast />
  </>
);

export default App;
