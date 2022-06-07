import { useState } from 'react';

import authAPI from 'apis/auth';
import { Button, Form, Input } from 'components/@shared';
import { useInput, usePasswordInput } from 'hooks';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { createInputValueGetter } from 'utils/dom';
import { formatPhoneNumber } from 'utils/formats';

import { USER_MESSAGE } from 'constants/message';
import PATH from 'constants/path';

function SignupForm() {
  const {
    password,
    setPassword,
    isPasswordLengthCorrect,
    isPasswordAllCharactersCorrect,
  } = usePasswordInput('');
  const { value: passwordCheck, setValue: setPasswordCheck } = useInput('');

  const [passwordCheckCorrect, setPasswordCheckCorrect] = useState(false);

  const navigate = useNavigate();

  const onChangePasswordCheckInput = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPasswordCheck(e);

    setPasswordCheckCorrect(password === e.target.value);
  };

  const onSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!(e.target instanceof HTMLFormElement)) return;

    const formElement = e.target.elements;
    const getInputValue = createInputValueGetter(formElement);
    const phoneNumber = getInputValue('phoneNumber');

    if (!phoneNumber.startsWith('010') || phoneNumber.length < 11) {
      alert(USER_MESSAGE.WRONG_PHONE_NUMBER);

      return;
    }

    const user = {
      username: getInputValue('username'),
      password,
      email: getInputValue('email'),
      address: getInputValue('address'),
      phoneNumber: formatPhoneNumber(phoneNumber),
    };

    try {
      await authAPI.signup(user);
      await navigate(PATH.LOGIN);
    } catch (error) {
      alert(USER_MESSAGE.FAIL_SIGNUP);
    }
  };

  return (
    <Form onSubmit={onSubmitForm}>
      <Input
        id="username"
        type="text"
        placeholder="사용자 이름(영문 소문자, 숫자, _, -)을 입력해주세요"
        pattern={'^[a-z0-9_-]{5,20}$'}
        required
      >
        사용자 이름
      </Input>
      <Input
        id="password"
        type="password"
        placeholder="8~16자의 비밀번호(영문 소문자, 숫자, 특수문자)를 입력해주세요"
        value={password}
        onChange={setPassword}
        pattern={
          '^(?=.*[A-Za-z])(?=.*\\d)(?=.*[!@#$%^&*()])[A-Za-z\\d!@#$%^&*()]{8,16}$'
        }
        required
      >
        비밀번호
        <StyledErrorSign
          isCorrect={isPasswordLengthCorrect && isPasswordAllCharactersCorrect}
        >
          ✓
        </StyledErrorSign>
        <StyledErrorMessage isCorrect={isPasswordLengthCorrect}>
          ∙ 8~16자 입력
        </StyledErrorMessage>
        <StyledErrorMessage isCorrect={isPasswordAllCharactersCorrect}>
          ∙ 영문, 숫자, 특수문자 모두 입력
        </StyledErrorMessage>
      </Input>
      <Input
        id="passwordCheck"
        type="password"
        placeholder="비밀번호를 재입력해주세요"
        value={passwordCheck}
        onChange={onChangePasswordCheckInput}
        pattern={
          '^(?=.*[A-Za-z])(?=.*\\d)(?=.*[!@#$%^&*()])[A-Za-z\\d!@#$%^&*()]{8,16}$'
        }
        required
      >
        비밀번호 재확인
        <StyledErrorSign isCorrect={passwordCheckCorrect}>✓</StyledErrorSign>
      </Input>
      <Input
        id="email"
        type="email"
        placeholder="이메일을 입력해주세요"
        pattern={'^[a-z0-9._-]+@[a-z]+[.]+[a-z]{2,3}$'}
        required
      >
        이메일
      </Input>
      <Input
        id="address"
        type="address"
        placeholder="주소를 입력해주세요"
        maxLength={255}
        required
      >
        주소
      </Input>
      <Input
        id="phoneNumber"
        type="number"
        placeholder="핸드폰 번호를 입력해주세요"
        required
      >
        핸드폰 번호
      </Input>
      <Button type="submit" marginTop="20px">
        회원가입
      </Button>
    </Form>
  );
}

const StyledErrorSign = styled.span`
  margin: 0 24px 0 12px;
  font-size: 16px;

  ${({ isCorrect }: { isCorrect: boolean }) => css`
    color: ${({ theme: { colors } }) =>
      isCorrect ? colors.green : colors.black};
  `}
`;

const StyledErrorMessage = styled.span`
  margin-left: 30px;
  font-size: 11px;

  ${({ isCorrect }: { isCorrect: boolean }) => css`
    color: ${({ theme: { colors } }) =>
      isCorrect ? colors.green : colors.black};
    font-weight: ${isCorrect ? 800 : 500};
  `}
`;

export default SignupForm;
