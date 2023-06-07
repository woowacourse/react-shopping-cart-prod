import { useCallback } from 'react';
import { useRecoilState } from 'recoil';

import { errorModalMessageState } from '../../../store/error';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import { Text } from '../Text/Text.styles';
import * as S from './ErrorModal.styles';

const ErrorModal = () => {
  const [errorMessage, setErrorMessage] = useRecoilState(errorModalMessageState);

  const handleClose = useCallback(() => {
    setErrorMessage(null);
  }, [setErrorMessage]);

  return (
    <Modal isOpen={!!errorMessage} handleClose={handleClose}>
      <S.ContentContainer>
        <Text css={S.messageStyle} id="modal-description">
          {errorMessage}
        </Text>
        <Button
          css={S.buttonStyle}
          aria-label="모달 닫기"
          variant="textButton"
          onClick={handleClose}
        >
          확인
        </Button>
      </S.ContentContainer>
    </Modal>
  );
};

export default ErrorModal;
