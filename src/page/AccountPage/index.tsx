// @ts-nocheck
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import useSnackbar from 'hooks/useSnackbar';
import useLogout from 'hooks/useLogout';

import { PasswordEditModal, AccountDeleteModal } from 'page';
import { Container, Input, Title, AuthButton } from 'components';
import { ReactComponent as EmailIcon } from 'assets/email_icon.svg';
import { ReactComponent as NicknameIcon } from 'assets/nickname_icon.svg';
import Styled from './index.style';

import { validateNickname } from 'utils/validator';
import { MESSAGE, ROUTES } from 'utils/constants';
import { doLogin } from 'reducers/auth.reducer';
import apiClient from 'apis/apiClient';

const AccountPage = () => {
  const { logoutByError } = useLogout();
  const dispatch = useDispatch();
  const [renderSnackbar] = useSnackbar();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');

  const [isNicknameCorrect, setIsNicknameCorrect] = useState(false);

  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isAccountDeleteModalOpen, setIsAccountDeleteModalOpen] = useState(false);

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    const response = await apiClient.get('/customers');

    setEmail(response.data.email);
  };

  const editNickname = async () => {
    try {
      if (!isNicknameCorrect) return;

      const response = await apiClient.patch('/customers/profile', {
        nickname,
      });
      dispatch(doLogin({ nickname: response.data.nickname }));
      renderSnackbar(MESSAGE.UPDATE_NICKNAME_SUCCESS, 'SUCCESS');
    } catch (error) {
      const customError = error.response.data;
      renderSnackbar(customError.message, 'FAILED');
      logoutByError(customError);
      navigate(ROUTES.LOGIN);
    }
  };

  return (
    <Styled.Container>
      <Container width="519px" height="512px">
        <div>
          <Title mainTitle="회원정보 수정" />
          <Input
            type="email"
            icon={<EmailIcon />}
            label="Email Address"
            inputValue={email}
            setInputValue={setEmail}
            isDisabled={true}
            autoFocus={true}
          />
          <Input
            icon={<NicknameIcon />}
            label="Nickname"
            inputValue={nickname}
            setInputValue={setNickname}
            validator={validateNickname}
            isCorrect={isNicknameCorrect}
            setIsCorrect={setIsNicknameCorrect}
          />
          <AuthButton
            actionType="Update Profile"
            action={editNickname}
            isDisabled={!isNicknameCorrect}
          />

          <Styled.Line />

          <Styled.ButtonContainer>
            <Styled.ChangePasswordButton
              onClick={() => {
                setIsPasswordModalOpen(true);
              }}
            >
              Change password
            </Styled.ChangePasswordButton>

            <Styled.DeleteAccountButton onClick={() => setIsAccountDeleteModalOpen(true)}>
              Delete your account
            </Styled.DeleteAccountButton>
          </Styled.ButtonContainer>
        </div>
      </Container>

      {isPasswordModalOpen && (
        <PasswordEditModal handleModal={() => setIsPasswordModalOpen(false)} />
      )}
      {isAccountDeleteModalOpen && (
        <AccountDeleteModal handleModal={() => setIsAccountDeleteModalOpen(false)} />
      )}
    </Styled.Container>
  );
};

export default AccountPage;
