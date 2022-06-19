import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import { GlobalStyles, theme } from 'components';
import store from 'store';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
    expanded: true,
  },
};

export const decorators = [
  (Story, context) => {
    return (
      <>
        <BrowserRouter>
          <GlobalStyles />
          <ThemeProvider theme={theme}>
            <Provider store={store}>
              <Story {...context} />
            </Provider>
          </ThemeProvider>
        </BrowserRouter>
      </>
    );
  },
];
