import { useState } from 'react';

import authAPI from 'apis/auth';
import Button from 'components/@shared/Button';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { createInputValueGetter } from 'utils/dom';
import { formatPhoneNumber } from 'utils/formats';
import {
  isValidPasswordAllCharacters,
  isValidPasswordLength,
} from 'utils/validator';

import { USER_MESSAGE } from 'constants/message';
import PATH from 'constants/path';

function SignupForm() {
  const navigate = useNavigate();

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [passwordLengthCorrect, setPasswordLengthCorrect] = useState(false);
  const [passwordAllCharactersCorrect, setPasswordAllCharactersCorrect] =
    useState(false);
  const [passwordCheckCorrect, setPasswordCheckCorrect] = useState(false);

  const handleIdInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };

  const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);

    setPasswordLengthCorrect(isValidPasswordLength(e.target.value));
    setPasswordAllCharactersCorrect(
      isValidPasswordAllCharacters(e.target.value)
    );
  };

  const handlePasswordCheckInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordCheck(e.target.value);

    setPasswordCheckCorrect(password === e.target.value);
  };

  const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleAddressInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  const handlerPhoneNumberInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 11) {
      setPhoneNumber(e.target.value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!(e.target instanceof HTMLFormElement)) return;

    const formElements = e.target.elements;
    const getInputValue = createInputValueGetter(formElements);
    const user = {
      username: getInputValue('id'),
      password: getInputValue('password'),
      email: getInputValue('email'),
      address: getInputValue('address'),
      phoneNumber: formatPhoneNumber(getInputValue('phoneNumber')),
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
      <label htmlFor="id">아이디</label>
      <input
        id="id"
        type="text"
        placeholder="아이디를 입력해주세요"
        value={id}
        onChange={handleIdInput}
        pattern={'^[a-z0-9_-]{5,20}$'}
        required
      />
      <label htmlFor="password">
        비밀번호
        <StyledErrorSign
          isCorrect={passwordLengthCorrect && passwordAllCharactersCorrect}
        >
          ✓
        </StyledErrorSign>
        <StyledErrorMessage isCorrect={passwordLengthCorrect}>
          ∙ 8~16자 입력
        </StyledErrorMessage>
        <StyledErrorMessage isCorrect={passwordAllCharactersCorrect}>
          ∙ 영문, 숫자, 특수문자 모두 입력
        </StyledErrorMessage>
      </label>
      <input
        id="password"
        type="password"
        placeholder="8~16자의 비밀번호(영문 소문자, 숫자, 특수문자)를 입력해주세요"
        value={password}
        onChange={handlePasswordInput}
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
        onChange={handlePasswordCheckInput}
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
        onChange={handleEmailInput}
        pattern={'^[a-z0-9._-]+@[a-z]+[.]+[a-z]{2,3}$'}
        required
      />
      <label htmlFor="address">주소</label>
      <input
        id="address"
        type="address"
        placeholder="주소를 입력해주세요"
        value={address}
        onChange={handleAddressInput}
        maxLength={255}
        required
      />
      <label htmlFor="phoneNumber">핸드폰 번호</label>
      <input
        id="phoneNumber"
        type="number"
        placeholder="핸드폰 번호를 입력해주세요"
        value={phoneNumber}
        onChange={handlerPhoneNumberInput}
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
