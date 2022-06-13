// @ts-nocheck
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useSnackbar from 'hooks/useSnackbar';
import { useDispatch } from 'react-redux';
import useAuth from 'hooks/db/useAuth';

import PasswordEditModal from './PasswordEditModal';
import AccountDeleteModal from './AccountDeleteModal';
import { Container, Input, Title, AuthButton } from 'components';
import { ReactComponent as EmailIcon } from 'assets/email_icon.svg';
import { ReactComponent as NicknameIcon } from 'assets/nickname_icon.svg';

import { doChangeNickname } from 'modules/auth';
import { validateNickname } from 'utils/validator';
import { PATHNAME, MESSAGE, SNACKBAR } from 'utils/constants';
import Styled from './index.style';

const AccountPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { renderSnackbar } = useSnackbar();
  const { updateNicknameAPI, getAccountAPI } = useAuth();

  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');

  const [isNicknameCorrect, setIsNicknameCorrect] = useState(false);

  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isAccountDeleteModalOpen, setIsAccountDeleteModalOpen] = useState(false);

  useEffect(() => {
    getEmail();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getEmail = async () => {
    try {
      const { email } = await getAccountAPI();

      setEmail(email);
    } catch (error) {}
  };

  const updateNickname = async () => {
    if (!isNicknameCorrect) return;

    try {
      const response = await updateNicknameAPI(nickname);

      dispatch(doChangeNickname({ nickname: response.nickname }));
      renderSnackbar(MESSAGE.UPDATE_NICKNAME_SUCCESS, SNACKBAR.SUCCESS);
      navigate(PATHNAME.TO_HOME);
    } catch (error) {
      const { code } = error.response.data;

      if (code === 1003) navigate(PATHNAME.TO_LOGIN);
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
            inputValue={email || ''}
            setInputValue={setEmail}
            isDisabled={true}
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
            action={updateNickname}
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
