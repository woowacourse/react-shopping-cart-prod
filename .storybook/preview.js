import { addDecorator } from '@storybook/react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Global } from '@emotion/react';

import store from 'store';

import GlobalStyles from 'styles/GlobalStyles';
import Snackbar from 'components/Snackbar';

addDecorator((story) => (
  <Provider store={store}>
    <Global styles={GlobalStyles} />
    <Snackbar />
    <BrowserRouter>
      <Routes>
        <Route path="*" element={story()} />
      </Routes>
    </BrowserRouter>
  </Provider>
));

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
