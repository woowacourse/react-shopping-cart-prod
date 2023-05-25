import { RouterProvider } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import GlobalStyle from './GlobalStyle';
import Toast from './components/common/Toast';

import router from './router';

function App() {
  return (
    <>
      <GlobalStyle />
      <RecoilRoot>
        <RouterProvider router={router} />
        <Toast />
      </RecoilRoot>
    </>
  );
}

export default App;
