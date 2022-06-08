import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useForm from 'hooks/useForm';
import Button from 'components/Button/Button';
import Input from 'components/Input/Input';
import PlainLink from 'components/PlainLink/PlainLink';
import * as S from 'pages/SigninPage/SigninPage.styled';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from 'redux/actions';
import { StoreState } from 'types';

function SigninPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { accessToken } = useSelector<StoreState, StoreState['customerState']>(
    ({ customerState }) => customerState
  );
  const { isSubmitting, registerForm, registerInput } = useForm();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    const formData = new FormData(e.target as HTMLFormElement);
    const payload = Object.fromEntries(formData.entries()) as {
      email: string;
      password: string;
    };

    try {
      dispatch(actions.signIn(payload));
    } catch (e) {
      if (axios.isAxiosError(e)) {
        alert('아이디, 비밀번호를 다시 확인해주세요.');
      } else {
        alert(e);
      }
    }
  };

  if (accessToken) {
    navigate('/');
  }

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
