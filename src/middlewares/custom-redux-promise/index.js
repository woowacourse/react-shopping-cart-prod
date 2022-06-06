const actionType = {
  Pending: 'PENDING',
  Fulfilled: 'FULFILLED',
  Rejected: 'REJECTED',
};

// eslint-disable-next-line no-unused-vars
const middlewarePromise = (store) => (next) => (action) => {
  let result;

  new Promise((resolve, reject) => {
    try {
      result = next({
        type: `${action.type}_${actionType.Pending}`,
      });
      resolve();
    } catch (err) {
      reject();
    }
  })
    .then(() => {
      result = next({
        ...action,
        type: `${action.type}_${actionType.Fulfilled}`,
      });
    })
    .catch(() => {
      result = next({
        type: `${action.type}_${actionType.Rejected}`,
      });
    });

  return result;
};

export default middlewarePromise;
