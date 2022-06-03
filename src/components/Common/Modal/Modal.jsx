import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import * as Styled from './style';
import { GiCancel } from 'react-icons/gi';

const Modal = ({ children, isModalOpened, closeModal }) => {
  const element = document.getElementById('modal-portal');

  return isModalOpened && element
    ? ReactDOM.createPortal(
        <Styled.Wrapper>
          <Styled.Dimmer onClick={closeModal} />
          <Styled.Contents>
            <Styled.IconWrapper onClick={closeModal}>
              <GiCancel size={20} />
            </Styled.IconWrapper>
            <Styled.ChildrenWrapper>{children}</Styled.ChildrenWrapper>
          </Styled.Contents>
        </Styled.Wrapper>,
        element,
      )
    : null;
};

Modal.propTypes = {
  children: PropTypes.element,
  isModalOpened: PropTypes.bool,
  closeModal: PropTypes.func,
};

export default Modal;
