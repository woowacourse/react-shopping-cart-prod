import ReactDom from 'react-dom';
import styles from './index.module.scss';

export type Direction = 'top' | 'bottom' | 'right' | 'left' | 'center';

interface Props {
  isModalOpen: boolean;
  direction: Direction;
  children: React.ReactNode;
  closeModal: () => void;
}

function Modal({ isModalOpen, closeModal, children, direction }: Props) {
  const $modalRoot = document.getElementById('modal-root') as HTMLElement;

  const dialogKeyDownListener = (event: React.KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === 'Escape') {
      closeModal();
    }
  };

  const dialogBackdropListener = (event: React.MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  return ReactDom.createPortal(
    isModalOpen && (
      <dialog
        className={`${styles['dialog-container']}`}
        onKeyDown={dialogKeyDownListener}
        onClick={dialogBackdropListener}
      >
        <div className={`${styles['modal-content']} ${styles[direction]} ${styles[`${direction}-animation`]}`}>
          {children}
        </div>
      </dialog>
    ),
    $modalRoot ?? document.body,
  );
}
export default Modal;
