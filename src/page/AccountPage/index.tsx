// @ts-nocheck
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useSnackbar from 'hooks/useSnackbar';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import PasswordEditModal from './PasswordEditModal';
import AccountDeleteModal from './AccountDeleteModal';
import { Container, Input, Title, AuthButton } from 'components';
import { ReactComponent as EmailIcon } from 'assets/email_icon.svg';
import { ReactComponent as NicknameIcon } from 'assets/nickname_icon.svg';

import { doLogin } from 'actions/actionCreator';
import { validateNickname } from 'utils/validator';
import { getCookie } from 'utils/cookie';
import { MESSAGE } from 'utils/constants';
import Styled from './index.style';

const AccountPage = () => {
  const dispatch = useDispatch();
  const [renderSnackbar] = useSnackbar();
  const navigate = useNavigate();
  const isAuthenticated = getCookie('accessToken');

  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');

  const [isNicknameCorrect, setIsNicknameCorrect] = useState(false);

  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isAccountDeleteModalOpen, setIsAccountDeleteModalOpen] = useState(false);

  useEffect(() => {
    getEmail();
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      renderSnackbar(MESSAGE.NO_AUTHORIZATION, 'FAILED');
      navigate('/login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getEmail = async () => {
    try {
      const accessToken = getCookie('accessToken');

      const response = await axios.get('/customers', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setEmail(response.data.email);
    } catch (error) {}
  };

  const updateNickname = async () => {
    try {
      if (!isNicknameCorrect) return;

      const accessToken = getCookie('accessToken');

      const response = await axios.patch(
        '/customers/profile',
        {
          nickname,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      dispatch(doLogin({ nickname: response.data.nickname }));
      renderSnackbar(MESSAGE.UPDATE_NICKNAME_SUCCESS, 'SUCCESS');
      navigate('/');
    } catch (error) {
      const { code, message } = error.response.data;

      if (code) {
        renderSnackbar(ERROR[code], 'FAILED');
      } else {
        renderSnackbar(message || error.message, 'FAILED');
      }

      /**
       * 2102 : 닉네임 형식이 옳지 않은 경우
       */
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
