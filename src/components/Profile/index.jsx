import React, { useEffect, useState, useCallback } from 'react';

import Button from 'styles/Button';
import ErrorWrapper from 'styles/ErrorWrapper';
import { Spinner, SpinnerWrapper } from 'styles/Spinner';

import Input from 'components/Input';
import ErrorMessage from 'components/ErrorMessage';

import Wrapper from './style';

import { checkName, isInvalidName, isEmpty } from 'utils/validation';

import * as API from 'service';

const Profile = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const handleNameChange = useCallback(({ target }) => {
    setName(target.value);
  }, []);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      await API.updateUser({ email, name });
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
      } catch ({ message }) {
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    effect();
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
      {error && (
        <ErrorWrapper>
          <p>{error}</p>
        </ErrorWrapper>
      )}
      <Button disabled={!name && isInvalidName(name)}>프로필</Button>
    </Wrapper>
  );
};

export default Profile;
