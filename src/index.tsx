import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';

import GlobalStyle from 'styles/GlobalStyle';
import theme from 'styles/theme';

import App from './App';

import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from 'redux/reducers';
import { Provider } from 'react-redux';

async function main() {
  if (window.location.pathname === '/react-shopping-cart-prod') {
    window.location.pathname = '/react-shopping-cart-prod/';

    return;
  }

  const { worker } = await import('./mocks/browser');

  await worker.start({
    serviceWorker: {
      url: '/react-shopping-cart-prod/mockServiceWorker.js',
    },
  });

  const store = createStore(rootReducer, {}, composeWithDevTools(applyMiddleware(thunk)));
  const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

  root.render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <App />
      </ThemeProvider>
    </Provider>
  );
}

main();
