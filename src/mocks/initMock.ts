const initMock = () => {
  const { worker } = require('./browser');

  worker.start({
    serviceWorker: {
      url: '/react-shopping-cart/mockServiceWorker.js',
    },
  });
};

export default initMock;
