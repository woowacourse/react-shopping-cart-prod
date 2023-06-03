import React from "react";
import ReactDOM from "react-dom/client";
import GlobalStyle from "./style/globalStyle";
import { ThemeProvider } from "styled-components";
import { theme } from "./style/theme";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { RecoilRoot } from "recoil";
import "./app/configs/recoil";
import { worker } from "./app/mocks/browser";

async function main() {
  await worker.start({
    serviceWorker: {
      url: "/react-shopping-cart-prod/mockServiceWorker.js",
    },
    onUnhandledRequest: "bypass",
  });

  ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
      <RecoilRoot>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <RouterProvider router={router} />
        </ThemeProvider>
      </RecoilRoot>
    </React.StrictMode>
  );
}

main();
