import { useState } from 'react';
import Modal from '../components/common/Modal';
import { submitLoginInfo } from '../api';
import { serverNameState } from '../atom/serverName';
import useToast from '../components/hooks/useToast';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import * as S from './styles/Login.styles';
import { API_ERROR_MESSAGE, API_SUCCESS_MESSAGE } from '../constants';
import { loginState } from '../atom/login';

const isError = (error: any): error is Error => {
  return error instanceof Error && typeof error.message === 'string';
};

export default function Login() {
  const setLoginState = useSetRecoilState(loginState);
  const serverName = useRecoilValue(serverNameState);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { showToast } = useToast();

  const openLoginModal = () => {
    setIsModalOpen(true);
  };

  const handleSubmitLoginInfo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.currentTarget);
      const id = formData.get('id');
      const password = formData.get('password');

      if (!(typeof id === 'string' && typeof password === 'string')) return;

      const loginToken = await submitLoginInfo(serverName, { name: id, password });

      setIsModalOpen(false);
      showToast('info', API_SUCCESS_MESSAGE.login);
      setLoginState(loginToken);
    } catch (e) {
      if (isError(e)) {
        if (e.message.includes('FETCH')) showToast('error', API_ERROR_MESSAGE.login);
        showToast('error', e.message);
      }
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
            placeholder="4~10글자 사이의 아이디를 입력하세요."
            autoFocus
            maxLength={8}
            pattern=".{2,8}"
            required
            title="4~10글자 사이의 아이디를 입력해주세요."
          />
          <S.LoginLabel>비밀번호</S.LoginLabel>
          <S.LoginInput
            name="password"
            placeholder="4~10글자 사이의 비밀번호를 입력하세요."
            maxLength={8}
            pattern=".{2,8}"
            required
            title="4~10글자 사이의 아이디를 입력해주세요."
          />
          <S.LoginButton>로그인</S.LoginButton>
        </S.LoginWrapper>
      </Modal>
    </>
  );
}
