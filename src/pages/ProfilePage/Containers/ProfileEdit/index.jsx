import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import userThunk from 'store/user/thunk';

import useFetch from 'hooks/useFetch';
import useForm from 'hooks/useForm';

import { Button, FieldSet, InputField } from 'components/@common';

import { requestPasswordUpdate, requestProfileUpdate } from 'api/members';
import { getFormData } from 'lib/formUtils';
import { userValidator } from 'lib/validateUtils';

import * as S from '../../styles';

function ProfileEdit({ confirmPassword }) {
  const dispatch = useDispatch();
  const currentNickname = useSelector(({ user }) => user.userInfo.nickname);

  const validationList = {
    nickname: ({ nickname }) => userValidator.nickname(nickname, currentNickname),
    password: ({ password }) => userValidator.password(password),
  };
  const { errorList, onBlurInput, onChangeInput } = useForm(validationList);

  const { fetchControl: fetchNicknameControl, isLoading: isNicknameCheckLoading } =
    useFetch(requestProfileUpdate);
  const { fetchControl: fetchPasswordControl, isLoading: isPasswordCheckLoading } =
    useFetch(requestPasswordUpdate);

  const [editStatus, setEditStatus] = useState({ nickname: false, password: false });

  const onClickEditButton = (targetName) => (event) => {
    const formData = getFormData(event.target.form);
    const targetText = targetName === 'nickname' ? '닉네임' : '비밀번호';
    const targetState = {
      value: formData[targetName],
      error: errorList[targetName],
      isEditStatus: editStatus[targetName],
    };

    if (targetState.isEditStatus === false) {
      setEditStatus({ ...editStatus, [targetName]: true });
      return;
    }

    if (!targetState.value) {
      alert(`변경할 ${targetText}을(를) 입력해주세요.`);
      return;
    }

    if (targetState.error) {
      alert(targetState.error);
      return;
    }

    let fetchControl;
    let requestBody;

    switch (targetName) {
      case 'nickname':
        fetchControl = fetchNicknameControl;
        requestBody = { nickname: formData.nickname, password: confirmPassword };

        break;
      case 'password':
        fetchControl = fetchPasswordControl;
        requestBody = {
          oldPassword: confirmPassword,
          newPassword: formData.password,
        };
        break;

      default:
        alert('잘못된 시도입니다.');
        return;
    }

    fetchControl.start(requestBody, {
      success: () => {
        alert('변경이 완료되었습니다.');

        targetName !== 'password' && dispatch(userThunk.getUserProfile());
        setEditStatus({ ...editStatus, [targetName]: false });
      },
      error: (errorMessage) => alert(errorMessage),
    });
  };

  return (
    <S.Container onChange={onChangeInput} onBlur={onBlurInput}>
      <FieldSet
        labelText="닉네임 변경"
        description="닉네임은 한글, 영문, 숫자를 사용하여 최소 2자부터 최대 10자까지 입력할 수 있습니다."
      >
        <S.InlineField>
          <InputField
            name="nickname"
            type="text"
            status={errorList.nickname && 'danger'}
            message={errorList.nickname}
            placeholder="변경하시려면 우측의 변경 버튼을 눌러주세요."
            defaultValue={currentNickname}
            isDisabled={!editStatus.nickname}
          />
          <Button
            type="button"
            status={editStatus.nickname ? 'primary' : 'default'}
            isDisabled={isNicknameCheckLoading}
            onClick={onClickEditButton('nickname')}
          >
            변경
          </Button>
        </S.InlineField>
      </FieldSet>

      <FieldSet
        labelText="비밀번호 변경"
        description="비밀번호는 영문, 숫자, 특수문자를 포함하여 최소 8자에서 16자까지 입력할 수 있습니다."
      >
        <S.InlineField>
          <InputField
            name="password"
            type="password"
            placeholder="변경하시려면 우측의 변경 버튼을 눌러주세요."
            isDisabled={!editStatus.password}
          />
          <Button
            type="button"
            status={editStatus.password ? 'primary' : 'default'}
            isDisabled={isPasswordCheckLoading}
            onClick={onClickEditButton('password')}
          >
            변경
          </Button>
        </S.InlineField>
      </FieldSet>
    </S.Container>
  );
}

export default ProfileEdit;
