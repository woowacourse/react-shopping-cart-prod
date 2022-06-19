import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useSnackbar from 'hooks/useSnackbar';

import { Input, Title, AuthButton, Container, Modal } from 'components';
import { ReactComponent as PasswordIcon } from 'assets/pw_icon.svg';

import { validatePassword } from 'utils/validator';
import { PATHNAME, MESSAGE, SNACKBAR } from 'utils/constants';
import useAuth from 'hooks/domain/useAuth';

const PasswordEditModal = ({ handleModal }) => {
  const navigate = useNavigate();
  const { renderSnackbar } = useSnackbar();
  const { updatePassword } = useAuth();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isCorrectPassword, setIsCorrectPassword] = useState(false);

  const handleUpdateButtonClick = () => {
    if (!isCorrectPassword) return;

    updatePassword(currentPassword, newPassword, () => {
      renderSnackbar(MESSAGE.UPDATE_PASSWORD_SUCCESS, SNACKBAR.SUCCESS);
      handleModal();
      navigate(PATHNAME.TO_HOME);
    });
  };

  return (
    <Modal onCloseModal={handleModal}>
      <Container width="505px" height="400px">
        <div>
          <Title mainTitle="비밀번호 변경" />
          <Input
            type="password"
            icon={<PasswordIcon />}
            label="Current Password"
            inputValue={currentPassword}
            setInputValue={setCurrentPassword}
          />
          <Input
            type="password"
            icon={<PasswordIcon />}
            label="New Password"
            inputValue={newPassword}
            setInputValue={setNewPassword}
            validator={validatePassword}
            isCorrect={isCorrectPassword}
            setIsCorrect={setIsCorrectPassword}
          />
          <AuthButton
            actionType="Change Password"
            action={handleUpdateButtonClick}
            isDisabled={!isCorrectPassword}
          />
        </div>
      </Container>
    </Modal>
  );
};

export default PasswordEditModal;
