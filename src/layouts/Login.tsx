import { useState } from 'react';
import Modal from '../components/common/Modal';
import { serverNameState } from '../atom/serverName';
import { useRecoilValue } from 'recoil';
import * as S from './styles/Login.styles';
import { usePostLogin } from '../components/hooks/usePostLogin';

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
