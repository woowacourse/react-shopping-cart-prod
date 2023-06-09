import { useState } from 'react';
import Modal from '../components/common/Modal';
import { serverNameState } from '../atom/serverName';
import { useRecoilValue } from 'recoil';
import * as S from './styles/Login.styles';
import { usePostLogin } from '../components/hooks/usePostLogin';
import {
  LOGIN_SINGUP_FORMAT,
  LOGIN_SINGUP_ID_PLACEHOLDER,
  LOGIN_SINGUP_PW_PLACEHOLDER,
} from '../constants';

export default function Login() {
  const serverName = useRecoilValue(serverNameState);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { postLoginThroughApi } = usePostLogin();

  const openLoginModal = () => {
    setIsModalOpen(true);
  };

  const handleSubmitLoginInfo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const id = formData.get('id');
    const password = formData.get('password');

    if (typeof id === 'string' && typeof password === 'string') {
      postLoginThroughApi(serverName, { name: id, password }, setIsModalOpen);
    }
  };

  return (
    <>
      <S.LoginBox onClick={openLoginModal}>로그인</S.LoginBox>
      <Modal
        isModalOpen={isModalOpen}
        closeModal={() => {
          setIsModalOpen(false);
        }}
        width="520px"
        height="360px"
      >
        <S.LoginWrapper onSubmit={handleSubmitLoginInfo}>
          <S.LoginLabel>아이디</S.LoginLabel>
          <S.LoginInput
            name="id"
            placeholder={LOGIN_SINGUP_ID_PLACEHOLDER}
            autoFocus
            maxLength={8}
            pattern={LOGIN_SINGUP_FORMAT}
            required
            title={LOGIN_SINGUP_ID_PLACEHOLDER}
          />
          <S.LoginLabel>비밀번호</S.LoginLabel>
          <S.LoginInput
            name="password"
            placeholder={LOGIN_SINGUP_PW_PLACEHOLDER}
            maxLength={8}
            pattern={LOGIN_SINGUP_FORMAT}
            required
            type="password"
            title={LOGIN_SINGUP_PW_PLACEHOLDER}
          />
          <S.LoginButton>로그인</S.LoginButton>
        </S.LoginWrapper>
      </Modal>
    </>
  );
}
