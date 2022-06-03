import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import * as Styled from './style';
import { BiError } from 'react-icons/bi';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { hideSnackBar } from 'reducers/ui/ui.actions';

const SnackBar = () => {
  const dispatch = useDispatch();
  const { isSnackBarVisibile, snackBarText, snackBarType } = useSelector(
    (state) => state.ui,
  );

  const element =
    typeof window !== 'undefined' && document.querySelector('#snackbar-portal');

  useEffect(() => {
    if (!isSnackBarVisibile) return;
    const timer = setTimeout(() => {
      dispatch(hideSnackBar());
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [isSnackBarVisibile]);

  return isSnackBarVisibile && element
    ? ReactDOM.createPortal(
        <Styled.Wrapper snackBarType={snackBarType}>
          {snackBarType === 'SUCCESS' ? (
            <AiOutlineCheckCircle size={20} />
          ) : (
            <BiError size={20} />
          )}
          <Styled.Text>{snackBarText}</Styled.Text>
        </Styled.Wrapper>,
        element,
      )
    : null;
};

export default SnackBar;
