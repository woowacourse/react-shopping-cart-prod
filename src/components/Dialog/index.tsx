import styled from 'styled-components';

import Modal from '@Components/Modal';

interface DialogProps {
  onClick: () => void;
  onClose: () => void;
  message: string;
}

const Dialog = ({ onClick, onClose, message }: DialogProps) => {
  return (
    <Modal onClose={onClose}>
      <Container>
        <Message>{message}</Message>
        <ButtonContainer>
          <CancleButton onClick={onClose}> 취소하기 </CancleButton>
          <CheckButton onClick={onClick}>삭제하기 </CheckButton>
        </ButtonContainer>
      </Container>
    </Modal>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin: 30px 50px;
`;

const Message = styled.div`
  text-align: center;
  margin-bottom: 50px;
  width: 550px;
  line-height: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 30px;
`;
const CancleButton = styled.button`
  cursor: pointer;

  width: 250px;
  height: 80px;
  border-radius: 15px;
  background-color: white;
  border: 2px solid ${(props) => props.theme.color.mainColor};

  font-size: 20px;
  font-weight: 700;
`;

const CheckButton = styled.button`
  cursor: pointer;

  width: 250px;
  height: 80px;
  border-radius: 15px;
  background-color: ${(props) => props.theme.color.mainColor};

  font-size: 20px;
  font-weight: 700;
  color: white;
`;

export default Dialog;
