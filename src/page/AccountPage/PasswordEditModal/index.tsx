import { useState } from 'react';
import axios from 'axios';
import useSnackbar from 'hooks/useSnackbar';

import { Input, Title, AuthButton, Container, Modal } from 'components';
import { ReactComponent as PasswordIcon } from 'assets/pw_icon.svg';

import { validatePassword } from 'utils/validator';
import { getCookie } from 'utils/cookie';
import { MESSAGE } from 'utils/constants';

const PasswordEditModal = ({ handleModal }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [isCorrectPassword, setIsCorrectPassword] = useState(false);
  const [renderSnackbar] = useSnackbar();

  const editPassword = async () => {
    try {
      if (!isCorrectPassword) return;

      const accessToken = getCookie('accessToken');

      await axios.patch(
        '/customers',
        {
          password: currentPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      renderSnackbar(MESSAGE.UPDATE_PASSWORD_SUCCESS, 'SUCCESS');
      handleModal();
    } catch (error) {
      renderSnackbar(MESSAGE.UPDATE_PASSWORD_FAILUER, 'FAILED');
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
