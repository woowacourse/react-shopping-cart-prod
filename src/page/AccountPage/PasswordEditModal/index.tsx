import { useState } from 'react';
import useSnackbar from 'hooks/useSnackbar';
import useLogout from 'hooks/useLogout';

import { Modal, Input, Title, AuthButton, Container } from 'components';
import { ReactComponent as PasswordIcon } from 'assets/pw_icon.svg';

import { validatePassword } from 'utils/validator';
import { MESSAGE } from 'utils/constants';
import apiClient from 'apis/apiClient';

const PasswordEditModal = ({ handleModal }) => {
  const { logoutByError } = useLogout();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [isCorrectPassword, setIsCorrectPassword] = useState(false);
  const [renderSnackbar] = useSnackbar();

  const editPassword = async () => {
    try {
      if (!isCorrectPassword) return;

      await apiClient.patch('/customers', {
        password: currentPassword,
        newPassword,
      });

      renderSnackbar(MESSAGE.UPDATE_PASSWORD_SUCCESS, 'SUCCESS');
      handleModal();
    } catch (error) {
      const customError = error.response.data;
      logoutByError(customError);
      renderSnackbar(customError.message, 'FAILED');
    }
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
            autoFocus={true}
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
            action={editPassword}
            isDisabled={!isCorrectPassword}
          />
        </div>
      </Container>
    </Modal>
  );
};

export default PasswordEditModal;
