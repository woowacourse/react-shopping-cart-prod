import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { COMMON_PAGES, NON_USER_PAGES, USER_PAGES } from 'pages';
import { PageTemplate } from 'components/common';
import useReduxState from 'hooks/useReduxState';
import ProtectedRoute from 'components/route/ProtectedRoute';
import { isLoggedInSelector } from 'store/selector';

function App() {
  const [isLoggedIn] = useReduxState(isLoggedInSelector);

  return (
    <BrowserRouter basename="/react-shopping-cart">
      <Routes>
        <Route element={<PageTemplate />}>
          {Object.keys(COMMON_PAGES).map((path) => (
            <Route key={path} path={path} element={COMMON_PAGES[path]} />
          ))}
          <Route element={<ProtectedRoute condition={isLoggedIn} />}>
            {Object.keys(USER_PAGES).map((path) => (
              <Route key={path} path={path} element={USER_PAGES[path]} />
            ))}
          </Route>
          <Route element={<ProtectedRoute condition={!isLoggedIn} />}>
            {Object.keys(NON_USER_PAGES).map((path) => (
              <Route key={path} path={path} element={NON_USER_PAGES[path]} />
            ))}
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
