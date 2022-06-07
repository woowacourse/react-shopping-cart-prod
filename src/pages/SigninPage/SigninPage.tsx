import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useForm from '../../hooks/useForm';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import PlainLink from '../../components/PlainLink/PlainLink';
import { SERVER_URL } from '../../configs/api';
import { SigninResponseBody } from '../../types';
import * as S from './SigninPage.styled';

function SigninPage() {
  const navigate = useNavigate();
  const { isSubmitting, registerForm, registerInput } = useForm();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
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
        alert('아이디, 비밀번호를 다시 확인해주세요.');
      } else {
        alert(e);
      }
    }
  };

  return (
    <S.PageBox>
      <S.Title>로그인</S.Title>
      <S.Form {...registerForm({ onSubmit: handleSubmit })}>
        <S.Section>
          <Input
            type="email"
            {...registerInput('email', {
              placeholder: '이메일을 입력해주세요.',
              maxLength: 50,
              required: true,
            })}
          />
          <Input
            type="password"
            {...registerInput('password', {
              placeholder: '비밀번호를 입력해주세요.',
              maxLength: 20,
              required: true,
            })}
          />
        </S.Section>
        <S.Section>
          <Button type="submit" disabled={isSubmitting}>
            로그인
          </Button>
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
