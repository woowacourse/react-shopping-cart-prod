import { RecoilRoot } from "recoil";
import { Toast } from "./components";
import { PageRouterProvider } from "./router";

const App = () => {
  return (
    <RecoilRoot>
      <PageRouterProvider />
      <Toast />
    </RecoilRoot>
  );
};

export default App;
