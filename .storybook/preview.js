import React from "react";

import { Provider } from "react-redux";
import configureStore from "@/redux/index";

import { BrowserRouter } from "react-router-dom";

import { ThemeProvider } from "@emotion/react";
import theme from "../src/styles/theme";

import GlobalStyles from "../src/styles/reset";

const { store } = configureStore();

export const decorators = [
  (Story) => (
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <Story />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  ),
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
