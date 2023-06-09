import { createPortal } from 'react-dom';
import Toast from './Toast';
import { useRecoilValue } from 'recoil';
import ToastState from '../../../store/ToastState';

const ToastContainer = () => {
  const toastState = useRecoilValue(ToastState);

  return createPortal(
    toastState.map(({ type, message }, index) => (
      <Toast key={message + index} type={type} message={message} />
    )),
    document.body,
  );
};

export default ToastContainer;
