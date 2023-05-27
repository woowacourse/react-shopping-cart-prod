import React from "react";
import { RecoilRoot } from "recoil";
import { PageRouterProvider } from "./router";
import { worker } from "mocks/browser";

if (process.env.NODE_ENV === "development") {
  worker.start();
}

const App = () => {
  return (
    <RecoilRoot>
      <PageRouterProvider />
    </RecoilRoot>
  );
};

export default App;
