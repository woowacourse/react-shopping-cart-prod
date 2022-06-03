import { useDispatch } from 'react-redux';
import { showSnackBar } from 'reducers/ui/ui.actions';

const useSnackBar = () => {
  const dispatch = useDispatch();

  const showSuccessSnackBar = (text) => {
    dispatch(showSnackBar({ type: 'SUCCESS', text }));
  };

  const showErrorSnackBar = (text) => {
    dispatch(showSnackBar({ type: 'ERROR', text }));
  };

  return { showSuccessSnackBar, showErrorSnackBar };
};

export default useSnackBar;
