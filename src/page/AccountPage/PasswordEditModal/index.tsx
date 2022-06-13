import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useSnackbar from 'hooks/useSnackbar';

import { Input, Title, AuthButton, Container, Modal } from 'components';
import { ReactComponent as PasswordIcon } from 'assets/pw_icon.svg';

import { doInitializeCart } from 'modules/cart';
import { doLogout } from 'modules/auth';
import { validatePassword } from 'utils/validator';
import { deleteCookie } from 'utils/cookie';
import { PATHNAME, MESSAGE, SNACKBAR } from 'utils/constants';
import useAuth from 'hooks/db/useAuth';

const PasswordEditModal = ({ handleModal }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { updatePasswordAPI } = useAuth();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [isCorrectPassword, setIsCorrectPassword] = useState(false);
  const [renderSnackbar] = useSnackbar();

  const updatePassword = async () => {
    if (!isCorrectPassword) return;

    try {
      await updatePasswordAPI(currentPassword, newPassword);

      deleteCookie('accessToken');
      dispatch(doInitializeCart());
      dispatch(doLogout());
      handleModal();
      renderSnackbar(MESSAGE.UPDATE_PASSWORD_SUCCESS, SNACKBAR.SUCCESS);
      navigate(PATHNAME.TO_HOME);
    } catch (error) {
      const { code } = error.response.data;

      if (code === 1003) {
        handleModal();
        navigate(PATHNAME.TO_HOME);
      }
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
            action={updatePassword}
            isDisabled={!isCorrectPassword}
          />
        </div>
      </Container>
    </Modal>
  );
};

export default PasswordEditModal;
