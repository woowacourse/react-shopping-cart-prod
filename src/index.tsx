import ReactDOM from 'react-dom/client';

import { Provider } from 'react-redux';
import { store } from './redux/store';

import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';
import GlobalStyle from './styles/GlobalStyle';

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <GlobalStyle />
      <App />
    </Provider>
  </ThemeProvider>
);
