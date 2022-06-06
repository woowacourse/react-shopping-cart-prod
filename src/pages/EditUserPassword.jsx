import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useInput from 'hooks/useInput';

import PageHeader from 'components/@common/PageHeader';
import Button from 'components/@common/Button/styles';
import Input from 'components/@common/Input/styles';
import ErrorMessage from 'components/@common/ErrorMessage';

import { requestEditUserPassword } from 'api';
import { snackbar } from 'actions/snackbar';
import { userPassword } from 'utils/validate';
import { COLORS } from 'styles/theme';
import { 비동기_요청 } from 'constants';

const EditUserPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    value: oldPassword,
    setValue: setOldPassword,
    checkValue: checkOldPassword,
  } = useInput(userPassword);

  const {
    value: newPassword,
    setValue: setNewPassword,
    checkValue: checkNewPassword,
  } = useInput(userPassword);

  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
  const [checkNewPasswordConfirm, setCheckNewPasswordConfirm] = useState(false);

  useEffect(() => {
    setCheckNewPasswordConfirm(newPassword === newPasswordConfirm);
  }, [newPassword, newPasswordConfirm]);

  const isValidForm = useMemo(
    () => checkOldPassword && checkNewPassword && checkNewPasswordConfirm,
    [checkOldPassword, checkNewPassword, checkNewPasswordConfirm],
  );

  const handleEditPassword = async (e) => {
    e.preventDefault();

    const response = await requestEditUserPassword({
      oldPassword,
      newPassword,
    });

    const message =
      response.status === 비동기_요청.SUCCESS
        ? '비밀번호를 수정 하였습니다!'
        : '비밀번호 수정에 실패했습니다!';

    dispatch(snackbar.pushMessageSnackbar(message));
    navigate('/');
  };

  return (
    <>
      <PageHeader color={COLORS.GRAY_300}>비밀번호 변경</PageHeader>
      <form style={{ width: '100%' }} onSubmit={handleEditPassword}>
        <label>
          현재 비밀번호
          <Input
            id="input-user-oldpassword"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            type="password"
            placeholder="현재 비밀번호를 입력해주세요"
            minLength={4}
            maxLength={20}
            margin="1rem 0"
            border={`1px solid ${COLORS.GRAY_400}`}
          />
        </label>

        <label>
          새 비밀번호
          <Input
            id="input-user-newpassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="새로운 비밀번호를 입력해주세요"
            type="password"
            minLength={4}
            maxLength={20}
            margin="1rem 0"
            border={`1px solid ${COLORS.GRAY_400}`}
          />
        </label>
        {checkNewPassword || (
          <ErrorMessage>8~20 사이의 영문자, 특수문자, 숫자로 입력해주세요</ErrorMessage>
        )}

        <label>
          새 비밀번호 확인
          <Input
            id="input-user-check-newpassword"
            value={newPasswordConfirm}
            onChange={(e) => setNewPasswordConfirm(e.target.value)}
            placeholder="새로운 비밀번호를 입력해주세요"
            type="password"
            minLength={4}
            maxLength={20}
            margin="1rem 0"
            border={`1px solid ${COLORS.GRAY_400}`}
          />
        </label>
        {checkNewPasswordConfirm || (
          <ErrorMessage>위에 입력한 비밀번호와 동일하게 입력해주세요</ErrorMessage>
        )}
        <Button
          margin="0.5rem 0"
          backgroundColor={COLORS.MINT_200}
          hoverColor={COLORS.MINT_100}
          disabled={!isValidForm}
        >
          수정하기
        </Button>
      </form>
    </>
  );
};

export default EditUserPassword;
