import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Button from 'styles/Button';
import ErrorWrapper from 'styles/ErrorWrapper';
import { Spinner, SpinnerWrapper } from 'styles/Spinner';

import Input from 'components/Input';
import ErrorMessage from 'components/ErrorMessage';

import Wrapper from './style';
import { TextLink } from 'styles/TextLink';

import { onMessage } from 'reducers/snackbar';
import { withdraw } from 'reducers/user';

import { checkName, isInvalidName, isEmpty } from 'utils/validation';

import * as API from 'service';

import { SNACKBAR_MESSAGE, PATH } from 'constants';
import { ERROR_MESSAGE } from 'constants';

const Profile = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleNameChange = useCallback(({ target }) => {
    setName(target.value);
  }, []);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      await API.updateUser({ name });
      dispatch(onMessage(SNACKBAR_MESSAGE.successUpdateUser()));
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const effect = async () => {
      try {
        const data = await API.getUser();

        setName(data.name);
        setEmail(data.email);
        setError('');
      } catch (e) {
        if (e.message === ERROR_MESSAGE.INVALID_TOKEN) {
          dispatch(withdraw());
          API.clearToken();
          navigate(PATH.LOGIN);
          dispatch(onMessage(ERROR_MESSAGE.INVALID_TOKEN));
        }
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    effect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Wrapper onSubmit={handleProfileSubmit}>
      {loading && (
        <SpinnerWrapper>
          <Spinner />
        </SpinnerWrapper>
      )}
      <p className="title">프로필</p>
      <div className="input-wrapper">
        <Input label="이메일" type="text" value={email} disabled={true} />
      </div>
      <div className="input-wrapper">
        <Input
          label="이름"
          type="text"
          value={name}
          onChange={handleNameChange}
        />
        <ErrorMessage validation={() => isEmpty(name) && checkName(name)} />
      </div>
      <div className="link-wrapper">
        <TextLink to="/withdrawal">회원탈퇴</TextLink>
      </div>
      {error && (
        <ErrorWrapper>
          <p>{error}</p>
        </ErrorWrapper>
      )}
      <Button disabled={!name || isInvalidName(name)}>변경</Button>
    </Wrapper>
  );
};

export default Profile;
