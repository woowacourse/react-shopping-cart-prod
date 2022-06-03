// @ts-nocheck
import ReactDOM from 'react-dom';
import Styled from './index.style';

const Snackbar = ({ message, status }) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Styled.Snackbar status={status}>{message}</Styled.Snackbar>,
        document.getElementById('snackbar-root'),
      )}
    </>
  );
};

export default Snackbar;
