import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import GlobalStyle from "./style/GlobalStyle";
import Palette from "style/Palette";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Palette />
    <GlobalStyle />
    <App />
  </React.StrictMode>
);
