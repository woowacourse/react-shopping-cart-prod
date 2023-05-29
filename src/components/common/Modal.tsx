import { styled } from 'styled-components';

interface Props {
  message: string;
}

const Modal = ({ message }: Props) => {
  return (
    <>
      <S.Backdrop></S.Backdrop>
      <S.Modal role='dialog'>{message}</S.Modal>
    </>
  );
};

const S = {
  Backdrop: styled.div`
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.2);
  `,

  Modal: styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 99;
    border-radius: 10px;
    padding: 20px 80px;
    transform: translate(-50%, -50%);
    background: var(--highlight-color);
    color: #fff;
  `,
};

export default Modal;
