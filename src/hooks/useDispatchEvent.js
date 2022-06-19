import { useDispatch, useStore } from 'react-redux';

function useDispatchEvent() {
  const store = useStore();
  const dispatch = useDispatch();

  const getRecentState = (reducer, state) => store.getState()[reducer][state];

  return { dispatch, getRecentState };
}

export default useDispatchEvent;
