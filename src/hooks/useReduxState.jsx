import { useDispatch, useSelector } from 'react-redux';

function useReduxState(selector) {
  const state = useSelector(selector);
  const dispatch = useDispatch();

  return [state, dispatch];
}

export default useReduxState;
