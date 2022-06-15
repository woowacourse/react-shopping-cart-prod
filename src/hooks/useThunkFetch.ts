import { AxiosError } from 'axios';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import type { Action, Dispatch } from 'redux';
import { RootState } from 'redux/rootReducer';

import { useAppDispatch } from './useAppDispatch';

type Selector<T> = (state: RootState) => T;
type ThunkActionCreator<T extends Action> = (dispatch: Dispatch<T>) => void;
interface State {
  data: unknown;
  error: AxiosError | null;
  loading: string | boolean;
}

const useThunkFetch = <StateType extends State, ActionType extends Action, ParamType>(
  selector: Selector<StateType>,
  thunkActionCreator: ThunkActionCreator<ActionType>,
  { useErrorBoundary }: { useErrorBoundary?: boolean } = {}
): StateType => {
  const dispatch = useAppDispatch<ActionType, ParamType>();
  const state = useSelector(selector);

  useEffect(() => {
    dispatch(thunkActionCreator);
  }, []);

  if (useErrorBoundary) {
    if (state.error) {
      throw state.error;
    }
  }

  return state;
};

export default useThunkFetch;
