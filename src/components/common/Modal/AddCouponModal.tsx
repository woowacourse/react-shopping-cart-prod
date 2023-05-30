import styled from '@emotion/styled';
import { Text } from '../Text/Text';
import { useModal } from '../../../hooks/useModal';

const AddCouponModal = () => {
  const { modalDataState, closeModal } = useModal();

  const onSubmit = () => {
    modalDataState.callBack && modalDataState.callBack();
    closeModal();
  };

  return (
    <ModalWrapper>
      <TextWrapper>
        <Text size="smallest" weight="light">
          {modalDataState.title}
        </Text>
      </TextWrapper>
      <ButtonWrapper>
        <ButtonStyle onClick={onSubmit}>
          <Text size="smallest" weight="normal">
            확인
          </Text>
        </ButtonStyle>
      </ButtonWrapper>
    </ModalWrapper>
  );
};

export default AddCouponModal;

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 304px;
  max-width: 304px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.15);
`;

const TextWrapper = styled.div`
  width: 100%;
  height: 104px;
  background-color: #fff;
  border-radius: 8px 8px 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  height: 56px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 0 0 8px 8px;
  display: flex;
  flex-direction: row;
`;

const ButtonStyle = styled.button`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: #fff;
  &:hover {
    filter: brightness(0.94);
  }
`;
