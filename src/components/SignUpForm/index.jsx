import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Button from 'styles/Button';
import ErrorWrapper from 'styles/ErrorWrapper';
import { Spinner, SpinnerWrapper } from 'styles/Spinner';

import Input from 'components/Input';
import ErrorMessage from 'components/ErrorMessage';

import Wrapper from './style';

import {
  checkName,
  checkEmail,
  checkPassword,
  checkPasswordConfirmation,
  isInvalidName,
  isInvalidEmail,
  isInvalidPassword,
  isEmpty,
} from 'utils/validation';

import { onMessage } from 'reducers/snackbar';

import * as API from 'service';

import { PATH, SNACKBAR_MESSAGE } from 'constants';

const SignUpForm = () => {
  const dispatch = useDispatch();
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleUserNameChange = useCallback(({ target }) => {
    setUserName(target.value);
  }, []);

  const handleEmailChange = useCallback(({ target }) => {
    setEmail(target.value);
  }, []);

  const handlePasswordChange = useCallback(({ target }) => {
    setPassword(target.value);
  }, []);

  const handlePasswordConfirmationChange = useCallback(({ target }) => {
    setPasswordConfirmation(target.value);
  }, []);

  const checkSignUpForm = () => {
    try {
      checkName(userName);
      checkEmail(email);
      checkPassword(password);
      checkPasswordConfirmation(password, passwordConfirmation);
    } catch (error) {
      return false;
    }

    return true;
  };

  const handleSignUpFormSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      await API.signUp({
        name: userName,
        email,
        password,
      });
      navigate(PATH.HOME);
      dispatch(onMessage(SNACKBAR_MESSAGE.signUpUser()));
    } catch ({ message }) {
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper onSubmit={handleSignUpFormSubmit}>
      {loading && (
        <SpinnerWrapper>
          <Spinner />
        </SpinnerWrapper>
      )}
      <p className="title">회원가입</p>
      <div className="input-wrapper">
        <Input
          label="이름"
          type="text"
          value={userName}
          placeholder="이름"
          onChange={handleUserNameChange}
          isError={!isEmpty(userName) && isInvalidName(userName)}
        />
        <ErrorMessage
          validation={() => !isEmpty(userName) && checkName(userName)}
        />
      </div>
      <div className="input-wrapper">
        <Input
          label="이메일"
          type="email"
          value={email}
          placeholder="이메일"
          onChange={handleEmailChange}
          isError={!isEmpty(email) && isInvalidEmail(email)}
        />
        <ErrorMessage validation={() => !isEmpty(email) && checkEmail(email)} />
      </div>
      <div className="password-wrapper">
        <Input
          label="비밀번호"
          type="password"
          value={password}
          placeholder="비밀번호"
          onChange={handlePasswordChange}
          isError={!isEmpty(password) && isInvalidPassword(password)}
        />
        <ErrorMessage
          validation={() => !isEmpty(password) && checkPassword(password)}
        />
        <Input
          type="password"
          value={passwordConfirmation}
          placeholder="비밀번호 확인"
          onChange={handlePasswordConfirmationChange}
          isError={
            !isEmpty(passwordConfirmation) && password !== passwordConfirmation
          }
        />
        <ErrorMessage
          validation={() =>
            !isEmpty(passwordConfirmation) &&
            checkPasswordConfirmation(password, passwordConfirmation)
          }
        />
      </div>
      {error && (
        <ErrorWrapper>
          <p>{error}</p>
        </ErrorWrapper>
      )}
      <Button disabled={!checkSignUpForm()}>회원가입</Button>
    </Wrapper>
  );
};

export default SignUpForm;
