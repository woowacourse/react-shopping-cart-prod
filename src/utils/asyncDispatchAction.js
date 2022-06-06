import { 비동기_요청 } from 'constants/';

const asyncDispatchAction = (dispatch, response, action) => {
  const actionType = response.status === 비동기_요청.FAILURE ? action.FAILURE : action.SUCCESS;

  dispatch({
    type: actionType,
    payload: response.content,
  });
};

export default asyncDispatchAction;
