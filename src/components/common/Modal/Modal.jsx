import React from 'react';
import ReactDOM from 'react-dom';

import * as S from 'components/common/Modal/Modal.style';

function Modal({ children, closeModal }) {
  const handleCloseModal = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return ReactDOM.createPortal(
    <S.Root>
      <S.Container>{children}</S.Container>
      <S.Backdrop onClick={handleCloseModal} />
    </S.Root>,
    document.querySelector('#root'),
  );
}

export default Modal;
