import CloseButton from 'components/CloseButton';
import { PropsWithChildren } from 'react';
import ReactDOM from 'react-dom';
import Styled from './index.style';

interface Props {
  onCloseModal(): void;
}

const Modal = ({ children, onCloseModal }: PropsWithChildren<Props>) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Styled.Backdrop onClick={onCloseModal} />,
        document.getElementById('backdrop-root'),
      )}
      {ReactDOM.createPortal(
        <Styled.Modal>
          <Styled.CloseButton>
            <CloseButton handleClick={onCloseModal} />
          </Styled.CloseButton>
          {children}
        </Styled.Modal>,
        document.getElementById('overlay-root'),
      )}
    </>
  );
};

export default Modal;
