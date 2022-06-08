import React from 'react';
import { useDispatch } from 'react-redux';

import { Spinner, SpinnerWrapper } from 'styles/Spinner';
import ErrorWrapper from 'styles/ErrorWrapper';

import Input from 'components/Input';

import Wrapper from './style';

import { updatePassword } from 'service';

import { onMessage } from 'reducers/snackbar';

import { SNACKBAR_MESSAGE } from 'constants';

const PasswordPage = () => {
  const dispatch = useDispatch();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleOldPasswordChange = ({ target }) => {
    setOldPassword(target.value);
  };

  const handleNewPasswordChange = ({ target }) => {
    setNewPassword(target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      await updatePassword(oldPassword, newPassword);
      dispatch(onMessage(SNACKBAR_MESSAGE.updatePassword()));
    } catch ({ message }) {
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper onSubmit={handleFormSubmit}>
      {loading && (
        <SpinnerWrapper>
          <Spinner />
        </SpinnerWrapper>
      )}
      <p className="title">비밀번호 변경</p>
      <Input
        label="원래 비밀번호"
        type="text"
        value={oldPassword}
        placeholder="원래 비밀번호"
        onChange={handleOldPasswordChange}
      />
      <Input
        label="새 비밀번호"
        type="text"
        value={newPassword}
        placeholder="새 비밀번호"
        onChange={handleNewPasswordChange}
      />
      {error && (
        <ErrorWrapper>
          <p>{error}</p>
        </ErrorWrapper>
      )}
    </Wrapper>
  );
};

export default PasswordPage;
