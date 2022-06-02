import React, { useEffect, useState, useCallback } from 'react';

import Button from 'styles/Button';
import ErrorWrapper from 'styles/ErrorWrapper';
import { Spinner, SpinnerWrapper } from 'styles/Spinner';

import Input from 'components/Input';
import ErrorMessage from 'components/ErrorMessage';

import Wrapper from './style';

import { checkName, isInvalidName, isEmpty } from 'utils/validation';

import { getApi, putApi } from 'service';

import { useSelector } from 'react-redux';

const Profile = () => {
  const accessToken = useSelector((state) => state.user.accessToken);
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
      await putApi('api/customer', { email, name });
    } catch (e) {
      console.log(e);
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const effect = async () => {
      try {
        console.log(accessToken);
        // axios.defaults.headers.common[
        //   'Authorization'
        // ] = `Bearer ${accessToken}`;
        const data = await getApi('api/customer');

        setName(data.name);
        setEmail(data.email);
      } catch (e) {
        console.log(e);
        setError('effect', e);
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
