import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useSnackbar from 'hooks/useSnackbar';

import { Input, Title, AuthButton, Container, Modal } from 'components';
import { ReactComponent as PasswordIcon } from 'assets/pw_icon.svg';

import { doInitializeCart } from 'modules/cart';
import { doLogout } from 'modules/auth';
import { validatePassword } from 'utils/validator';
import { getCookie, deleteCookie } from 'utils/cookie';
import { MESSAGE, ERROR } from 'utils/constants';

const PasswordEditModal = ({ handleModal }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [isCorrectPassword, setIsCorrectPassword] = useState(false);
  const [renderSnackbar] = useSnackbar();

  const updatePassword = async () => {
    try {
      if (!isCorrectPassword) return;

      const accessToken = getCookie('accessToken');

      await axios.patch(
        '/customers/password',
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

      deleteCookie('accessToken');
      dispatch(doInitializeCart());
      dispatch(doLogout());
      handleModal();
      renderSnackbar(MESSAGE.UPDATE_PASSWORD_SUCCESS, 'SUCCESS');
      navigate('/');
    } catch (error) {
      const { code, message } = error.response.data;

      if (code) {
        renderSnackbar(ERROR[code], 'FAILED');
      } else {
        renderSnackbar(message || error.message, 'FAILED');
      }

      if (code === 1003) {
        deleteCookie('accessToken');
        dispatch(doInitializeCart());
        dispatch(doLogout());
        handleModal();
        navigate('/');
      }

      /**
       * 2103 : 비밀번호 형식이 옳지 않은 경우
       * 2202 : 입력된 비밀번호가 현재 비밀번호와 일치하지 않는 경우
       * 1003 : 토큰이 유효하지 않은 경우
       */
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
