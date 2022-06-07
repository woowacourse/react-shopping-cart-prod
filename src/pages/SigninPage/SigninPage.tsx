import axios from 'axios';
import { SERVER_URL } from 'configs/api';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SigninResponseBody } from 'types';

import * as S from 'pages/SigninPage/SigninPage.styled';

import Button from 'components/Button/Button';
import Input from 'components/Input/Input';
import PlainLink from 'components/PlainLink/PlainLink';

function SigninPage() {
  const navigate = useNavigate();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await axios.post<SigninResponseBody>(
        `${SERVER_URL}/api/customer/authentication/sign-in`,
        payload
      );

      const { accessToken, userId } = response.data;

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('userId', String(userId));
      navigate('/');
    } catch (e) {
      if (axios.isAxiosError(e)) {
        alert('유효하지 않은 이메일 형식입니다.');
      } else {
        alert(e);
      }
    }
  };

  return (
    <S.PageBox>
      <S.Title>로그인</S.Title>
      <S.Form onSubmit={handleSubmit}>
        <S.Section>
          <Input
            type="email"
            name="email"
            placeholder="이메일을 입력해주세요."
            required
          />
          <Input
            type="password"
            name="password"
            placeholder="비밀번호를 입력해주세요."
            required
          />
        </S.Section>
        <S.Section>
          <Button type="submit">로그인</Button>
          <PlainLink to="/signup/1">
            <Button type="button" color="white">
              회원가입
            </Button>
          </PlainLink>
        </S.Section>
      </S.Form>
    </S.PageBox>
  );
}

export default SigninPage;
