import { useState } from 'react';

import authAPI from 'apis/auth';
import Button from 'components/@shared/Button';
import { useInput, usePasswordInput, usePhoneNumberInput } from 'hooks';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { formatPhoneNumber } from 'utils/formats';

import { USER_MESSAGE } from 'constants/message';
import PATH from 'constants/path';

function SignupForm() {
  const { value: username, setValue: setUsername } = useInput('');
  const {
    password,
    setPassword,
    isPasswordLengthCorrect,
    isPasswordAllCharactersCorrect,
  } = usePasswordInput('');
  const { value: passwordCheck, setValue: setPasswordCheck } = useInput('');
  const { value: email, setValue: setEmail } = useInput('');
  const { value: address, setValue: setAddress } = useInput('');
  const { phoneNumber, setPhoneNumber } = usePhoneNumberInput('');

  const [passwordCheckCorrect, setPasswordCheckCorrect] = useState(false);

  const navigate = useNavigate();

  const onChangePasswordCheckInput = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPasswordCheck(e);

    setPasswordCheckCorrect(password === e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const user = {
      username,
      password,
      email,
      address,
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
    <StyledForm onSubmit={handleSubmit}>
      <label htmlFor="id">사용자 이름</label>
      <input
        id="username"
        type="text"
        placeholder="사용자 이름을 입력해주세요"
        value={username}
        onChange={setUsername}
        pattern={'^[a-z0-9_-]{5,20}$'}
        required
      />
      <label htmlFor="password">
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
      </label>
      <input
        id="password"
        type="password"
        placeholder="8~16자의 비밀번호(영문 소문자, 숫자, 특수문자)를 입력해주세요"
        value={password}
        onChange={setPassword}
        pattern={
          '^(?=.*[A-Za-z])(?=.*\\d)(?=.*[!@#$%^&*()])[A-Za-z\\d!@#$%^&*()]{8,16}$'
        }
        required
      />
      <label htmlFor="passwordCheck">
        비밀번호 재확인
        <StyledErrorSign isCorrect={passwordCheckCorrect}>✓</StyledErrorSign>
      </label>
      <input
        id="passwordCheck"
        type="password"
        placeholder="비밀번호를 재입력해주세요"
        value={passwordCheck}
        onChange={onChangePasswordCheckInput}
        pattern={
          '^(?=.*[A-Za-z])(?=.*\\d)(?=.*[!@#$%^&*()])[A-Za-z\\d!@#$%^&*()]{8,16}$'
        }
        required
      />
      <label htmlFor="email">이메일</label>
      <input
        id="email"
        type="email"
        placeholder="이메일을 입력해주세요"
        value={email}
        onChange={setEmail}
        pattern={'^[a-z0-9._-]+@[a-z]+[.]+[a-z]{2,3}$'}
        required
      />
      <label htmlFor="address">주소</label>
      <input
        id="address"
        type="address"
        placeholder="주소를 입력해주세요"
        value={address}
        onChange={setAddress}
        maxLength={255}
        required
      />
      <label htmlFor="phoneNumber">핸드폰 번호</label>
      <input
        id="phoneNumber"
        type="number"
        placeholder="핸드폰 번호를 입력해주세요"
        value={phoneNumber}
        onChange={setPhoneNumber}
        required
      />
      <Button type="submit" marginTop="20px">
        회원가입
      </Button>
    </StyledForm>
  );
}

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;

  width: 100%;

  > label {
    margin-top: 4px;
    font-size: 14px;
  }

  > input {
    border: 1px solid ${({ theme: { colors } }) => colors.lightGray};
    border-radius: 2px;
    padding: 6px 8px;
  }
`;

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
