import { useDispatch } from 'react-redux';
import { useRef, useEffect } from 'react';
import { clearSnackBar } from 'redux/actions/snackBar';
import { useAppSelector } from 'hooks/useAppSelector';
import { SNACKBAR_RUNNING_TIME } from 'constant';
import { Styled } from './styles';

export default function SnackBar() {
  const dispatch = useDispatch();
  const timer = useRef<ReturnType<typeof setTimeout>>();
  const { text } = useAppSelector(state => state.snackBarReducer);

  if (timer.current) {
    clearTimeout(timer.current);
  }

  timer.current = setTimeout(() => {
    dispatch(clearSnackBar());
  }, SNACKBAR_RUNNING_TIME);

  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  return text && <Styled.Box key={Math.random()}>{text}</Styled.Box>;
}
