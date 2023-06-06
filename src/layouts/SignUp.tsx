import { useState } from 'react';
import Modal from '../components/common/Modal';
import { serverNameState } from '../atom/serverName';
import { useRecoilValue } from 'recoil';
import * as S from './styles/SingUp.styles';
import { usePostSignUp } from '../components/hooks/usePostSignUp';

export default function SignUp() {
  const serverName = useRecoilValue(serverNameState);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { postSignUpThroughApi } = usePostSignUp();

  const openSignUpModal = () => {
    setIsModalOpen(true);
  };

  const handleSubmitSignUpInfo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const id = formData.get('id');
    const password = formData.get('password');

    if (typeof id === 'string' && typeof password === 'string') {
      await postSignUpThroughApi(serverName, { name: id, password }, setIsModalOpen);
    }
  };

  return (
    <>
      <S.SignUpBox onClick={openSignUpModal}>회원가입</S.SignUpBox>
      <Modal
        isModalOpen={isModalOpen}
        closeModal={() => {
          setIsModalOpen(false);
        }}
        width="520px"
        height="360px"
      >
        <S.SignUpWrapper onSubmit={handleSubmitSignUpInfo}>
          <S.SignUpLabel>아이디</S.SignUpLabel>
          <S.SignUpInput
            name="id"
            placeholder="4~10글자 사이의 아이디를 입력하세요."
            autoFocus
            maxLength={8}
            pattern=".{4,10}"
            required
            title="4~10글자 사이의 아이디를 입력해주세요."
          />
          <S.SignUpLabel>비밀번호</S.SignUpLabel>
          <S.SignUpInput
            name="password"
            placeholder="4~10글자 사이의 비밀번호를 입력하세요."
            maxLength={8}
            pattern=".{4,10}"
            required
            title="4~10글자 사이의 비밀번호를 입력해주세요."
          />
          <S.SignUpButton>회원가입</S.SignUpButton>
        </S.SignUpWrapper>
      </Modal>
    </>
  );
}
