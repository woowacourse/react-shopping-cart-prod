import { useState } from 'react';
import Modal from '../components/common/Modal';
import { serverNameState } from '../atom/serverName';
import { useRecoilValue } from 'recoil';
import * as S from './styles/SingUp.styles';
import { usePostSignUp } from '../components/hooks/usePostSignUp';
import {
  LOGIN_SINGUP_FORMAT,
  LOGIN_SINGUP_ID_PLACEHOLDER,
  LOGIN_SINGUP_PW_PLACEHOLDER,
} from '../constants';

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
            placeholder={LOGIN_SINGUP_ID_PLACEHOLDER}
            autoFocus
            maxLength={8}
            pattern={LOGIN_SINGUP_FORMAT}
            required
            title={LOGIN_SINGUP_ID_PLACEHOLDER}
          />
          <S.SignUpLabel>비밀번호</S.SignUpLabel>
          <S.SignUpInput
            name="password"
            placeholder={LOGIN_SINGUP_PW_PLACEHOLDER}
            maxLength={8}
            pattern={LOGIN_SINGUP_FORMAT}
            required
            type="password"
            title={LOGIN_SINGUP_PW_PLACEHOLDER}
          />
          <S.SignUpButton>회원가입</S.SignUpButton>
        </S.SignUpWrapper>
      </Modal>
    </>
  );
}
