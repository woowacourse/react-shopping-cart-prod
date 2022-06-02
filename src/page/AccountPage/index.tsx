// @ts-nocheck
import Container from 'components/@shared/Container';
import Input from 'components/Input';
import Title from 'components/Title';
import Styled from './index.style';
import { ReactComponent as EmailIcon } from 'assets/email_icon.svg';
import { ReactComponent as NicknameIcon } from 'assets/nickname_icon.svg';
import AuthButton from 'components/AuthButton';

import { useState, useEffect } from 'react';
import { validateNickname } from 'utils/validator';
import PasswordEditModal from './PasswordEditModal';
import AccountDeleteModal from './AccountDeleteModal';
import axios from 'axios';
import { getCookie } from 'utils/cookie';
import store from 'store/store';
import { doLogin } from 'actions/actionCreator';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AccountPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector(state => state.authReducer);

  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');

  const [isNicknameCorrect, setIsNicknameCorrect] = useState(false);

  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isAccountDeleteModalOpen, setIsAccountDeleteModalOpen] = useState(false);

  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const getProfile = async () => {
    const accessToken = getCookie('accessToken');

    const response = await axios.get('/customers', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    setEmail(response.data.email);
  };

  const updateProfile = async () => {
    if (!isNicknameCorrect) return;

    const accessToken = getCookie('accessToken');

    const response = await axios.patch(
      '/customers',
      {
        nickname,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    store.dispatch(doLogin({ nickname: response.data.nickname }));
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
            action={updateProfile}
            isDisabled={!isNicknameCorrect}
          />

          <Styled.Line />

          <Styled.ButtonContainer>
            <Styled.ChangePasswordButton onClick={() => setIsPasswordModalOpen(true)}>
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

// AccountDeleteModal

export default AccountPage;
