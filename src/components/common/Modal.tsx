import { forwardRef, ComponentPropsWithoutRef } from 'react';
import { styled } from 'styled-components';

interface Props extends ComponentPropsWithoutRef<'dialog'> {
  closeModal: () => void;
}

const Modal = forwardRef<HTMLDialogElement, Props>(({ closeModal, ...props }, ref) => {
  const handleBackdropClick = (event: React.MouseEvent<HTMLDialogElement, MouseEvent>) => {
    if (event.target === event.currentTarget) closeModal();
  };

  return (
    <Style.Container ref={ref} onClick={handleBackdropClick}>
      <Style.Content>{props.children}</Style.Content>
    </Style.Container>
  );
});

const Style = {
  Container: styled.dialog`
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    height: 50vh;
    overflow-y: scroll;

    border: none;
    border-radius: 8px;
    padding: 45px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);

    animation: fade-in 0.3s;

    ::backdrop {
      background: rgba(0, 0, 0, 0.3);
    }

    /* 모바일 */
    @media screen and (max-width: 767px) {
      padding: 15px;
    }

    @keyframes fade-in {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  `,

  Content: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
  `,
};

export default Modal;
