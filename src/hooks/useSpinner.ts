// @ts-nocheck
import { useDispatch, useSelector } from 'react-redux';
import { doHideSpinner, doShowSpinner } from 'modules/spinner';

const useSpinner = () => {
  const dispatch = useDispatch();
  const { isSpinnerVisible } = useSelector(state => state.spinnerReducer);

  const showSpinner = () => {
    dispatch(doShowSpinner());
  };

  const hideSpinner = () => {
    dispatch(doHideSpinner());
  };

  return { isSpinnerVisible, showSpinner, hideSpinner };
};

export default useSpinner;
