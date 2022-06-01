import { addDecorator } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import StyleTheme from '../src/style/theme';
import { Provider } from 'react-redux';
import configureStore from 'store/configureStore';
import GlobalStyle from 'style/globalStyle';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
const store = configureStore();

addDecorator((story) => (
  <Provider store={store}>
    <MemoryRouter>
      <StyleTheme>
        <GlobalStyle />
        {story()}
        <div id="snackbar-portal" />
      </StyleTheme>
    </MemoryRouter>
  </Provider>
));
