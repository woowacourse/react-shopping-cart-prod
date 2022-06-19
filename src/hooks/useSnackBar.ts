import { useDispatch } from 'react-redux';
import { useRef, useCallback } from 'react';
import { SnackbarActionType } from 'redux/actions/snackbar';

interface Payload {
  type: string;
  value: any;
}

const useSnackBar = () => {
  const timerRef = useRef(null);

  const snackbarDispatch = useDispatch();

  const openSnackbar = useCallback((load: Payload) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    snackbarDispatch({ type: SnackbarActionType.OPEN_SNACKBAR, payload: load });
    timerRef.current = setTimeout(() => {
      snackbarDispatch({ type: SnackbarActionType.CLOSE_SNACKBAR });
    }, 3000);
  }, []);

  const openModal = useCallback((load: Payload) => {
    snackbarDispatch({ type: SnackbarActionType.OPEN_SNACKBAR, payload: load });
  }, []);

  const closeModal = () => {
    snackbarDispatch({ type: SnackbarActionType.CLOSE_SNACKBAR });
  };

  return { openSnackbar, openModal, closeModal };
};

export default useSnackBar;
