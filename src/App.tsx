import { RecoilRoot } from 'recoil';
import Router from './Router';
import GlobalStyles from './styles/GlobalStyles';

const App = () => {
  return (
    <RecoilRoot>
      <GlobalStyles />
      <Router />
    </RecoilRoot>
  );
};

export default App;
