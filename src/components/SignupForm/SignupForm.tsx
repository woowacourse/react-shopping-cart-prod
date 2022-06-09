import { useState } from 'react';

import authAPI from 'apis/auth';
import { Button, Form, Input } from 'components/@shared';
import { useInput, usePasswordInput } from 'hooks';
import { useNavigate } from 'react-router-dom';
import { createInputValueGetter } from 'utils/dom';
import { formatPhoneNumber } from 'utils/formats';

import { USER_MESSAGE } from 'constants/message';
import PATH from 'constants/path';

import * as S from './SignupForm.styled';

function SignupForm() {
  const { value: username, setValue: setUsername } = useInput('');
  const { value: email, setValue: setEmail } = useInput('');
  const {
    password,
    setPassword,
    isPasswordLengthCorrect,
    isPasswordAllCharactersCorrect,
  } = usePasswordInput('');
  const { value: passwordCheck, setValue: setPasswordCheck } = useInput('');

  const [isUsableUsername, setIsUsableUsername] = useState(false);
  const [isUsableEmail, setIsUsableEmail] = useState(false);
  const [passwordCheckCorrect, setPasswordCheckCorrect] = useState(false);

  const navigate = useNavigate();

  const onChangePasswordCheckInput = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPasswordCheck(e);

    setPasswordCheckCorrect(password === e.target.value);
  };

  const checkDuplicateUsername = async () => {
    if (!/^[a-z0-9_-]{5,20}$/.test(username)) {
      alert(USER_MESSAGE.WRONG_INPUT_PATTERN);

      return;
    }

    try {
      authAPI.duplicateUsername(username).then(res => {
        if (res && !res.data.duplicated) {
          setIsUsableUsername(true);

          return;
        }

        alert(USER_MESSAGE.DUPLICATION_USERNAME);
      });
    } catch (error) {
      alert(USER_MESSAGE.ERROR_CHECK_USERNAME);
    }
  };

  const checkDuplicateEmail = () => {
    if (!/^[a-z0-9._-]+@[a-z]+[.]+[a-z]{2,3}$/.test(email)) {
      alert(USER_MESSAGE.WRONG_INPUT_PATTERN);

      return;
    }

    try {
      authAPI.duplicateEmail(email).then(res => {
        if (res && !res.data.duplicated) {
          setIsUsableEmail(true);

          return;
        }

        alert(USER_MESSAGE.DUPLICATION_EMAIL);
      });
    } catch (error) {
      alert(USER_MESSAGE.ERROR_CHECK_EMAIL);
    }
  };

  const makeCanEditUsername = () => {
    setIsUsableUsername(false);
  };

  const makeCanEditEmail = () => {
    setIsUsableEmail(false);
  };

  const onSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!(e.target instanceof HTMLFormElement)) return;

    if (!isUsableUsername || !isUsableEmail) {
      alert(USER_MESSAGE.NEED_CHECK_DUPLICATION);

      return;
    }

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
        value={username}
        onChange={setUsername}
        pattern={'^[a-z0-9_-]{5,20}$'}
        required
        disabled={isUsableUsername ? true : false}
      >
        사용자 이름
        {!isUsableUsername ? (
          <S.CheckDuplicateButton
            type="button"
            onClick={checkDuplicateUsername}
          >
            중복 체크
          </S.CheckDuplicateButton>
        ) : (
          <S.CheckDuplicateButton type="button" onClick={makeCanEditUsername}>
            수정
          </S.CheckDuplicateButton>
        )}
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
        <S.ErrorSign
          isCorrect={isPasswordLengthCorrect && isPasswordAllCharactersCorrect}
        >
          ✓
        </S.ErrorSign>
        <S.ErrorMessage isCorrect={isPasswordLengthCorrect}>
          ∙ 8~16자 입력
        </S.ErrorMessage>
        <S.ErrorMessage isCorrect={isPasswordAllCharactersCorrect}>
          ∙ 영문, 숫자, 특수문자 모두 입력
        </S.ErrorMessage>
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
        <S.ErrorSign isCorrect={passwordCheckCorrect}>✓</S.ErrorSign>
      </Input>
      <Input
        id="email"
        type="email"
        placeholder="이메일을 입력해주세요"
        value={email}
        onChange={setEmail}
        pattern={'^[a-z0-9._-]+@[a-z]+[.]+[a-z]{2,3}$'}
        required
        disabled={isUsableEmail ? true : false}
      >
        이메일
        {!isUsableEmail ? (
          <S.CheckDuplicateButton type="button" onClick={checkDuplicateEmail}>
            중복 체크
          </S.CheckDuplicateButton>
        ) : (
          <S.CheckDuplicateButton type="button" onClick={makeCanEditEmail}>
            수정
          </S.CheckDuplicateButton>
        )}
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

export default SignupForm;
