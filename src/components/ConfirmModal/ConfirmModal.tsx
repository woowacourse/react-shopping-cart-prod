import Box from 'components/@common/Box';
import Modal from 'components/@common/Modal/Modal';
import type { ModalProps } from 'components/@common/Modal/Modal';
import { PropsWithChildren } from 'react';
import styled from 'styled-components';

interface ConfirmModalProps extends ModalProps {
  onClickConfirmButton: () => void;
}

const ConfirmModal = ({ children, isOpen, closeModal, onClickConfirmButton }: PropsWithChildren<ConfirmModalProps>) => {
  const handleConfirm = () => {
    onClickConfirmButton();
    closeModal();
  };

  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <Box sizing={{ width: '300px', minHeight: '100px' }} flex={{ flexDirection: 'column' }}>
        <MessageWrapper>{children}</MessageWrapper>
        <ButtonContainer sizing={{ width: '100%', height: '50px' }}>
          <Button onClick={closeModal}>취소</Button>
          <Button onClick={handleConfirm}>확인</Button>
        </ButtonContainer>
      </Box>
    </Modal>
  );
};

export default ConfirmModal;

const MessageWrapper = styled.div`
  width: 100%;
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: -0.4px;
  padding: 40px 28px;
  text-align: center;
`;

const ButtonContainer = styled(Box)`
  border-top: 1px solid var(--color-grayscale-200);

  button:first-child {
    border-right: 1px solid var(--color-grayscale-200);
  }
`;

const Button = styled.button`
  width: 100%;
  height: 100%;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;
