import Routes from 'Routes';

import useUserSession from 'hooks/useUserSession';

function ShoppingCartApp() {
  useUserSession();
  return <Routes />;
}

export default ShoppingCartApp;
