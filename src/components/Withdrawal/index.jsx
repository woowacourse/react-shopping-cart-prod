import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Input from 'components/Input';
import Button from 'styles/Button';
import { Spinner, SpinnerWrapper } from 'styles/Spinner';
import ErrorWrapper from 'styles/ErrorWrapper';

import Wrapper from './style';

import { withdraw } from 'reducers/user';
import { onMessage } from 'reducers/snackbar';

import * as API from 'service';

import { PATH, SNACKBAR_MESSAGE } from 'constants';

const Withdrawal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePasswordChange = ({ target }) => {
    setPassword(target.value);
  };

  const handleWithdrawalSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      await API.deleteUser(password);
      API.clearToken();
      dispatch(withdraw());
      dispatch(onMessage(SNACKBAR_MESSAGE.withdrawUser()));
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper onSubmit={handleWithdrawalSubmit}>
      {loading && (
        <SpinnerWrapper>
          <Spinner />
        </SpinnerWrapper>
      )}
      <p className="title">회원탈퇴</p>
      <p className="warning">한 번 탈퇴하면 복구할 수 없습니다.</p>
      <div className="input-wrapper">
        <Input
          label={'비밀번호'}
          type={'password'}
          value={password}
          placeholder={'비밀번호'}
          onChange={handlePasswordChange}
          isError={error}
        />
      </div>
      {error && (
        <ErrorWrapper>
          <p>{error}</p>
        </ErrorWrapper>
      )}
      <Button red>회원 탈퇴</Button>
    </Wrapper>
  );
};

export default Withdrawal;
