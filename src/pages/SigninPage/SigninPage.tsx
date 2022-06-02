import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import * as S from './SigninPage.styled';
import axios from 'axios';
import PlainLink from '../../components/PlainLink/PlainLink';

type SigninResponseBody = { accessToken: string; userId: number };

function SigninPage() {
  const navigate = useNavigate();
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await axios.post<SigninResponseBody>(
        'http://15.164.166.148:8080/api/customer/authentication/sign-in',
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
