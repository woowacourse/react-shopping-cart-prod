import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import * as membersThunk from 'actions/members/thunk';

import useFormValidation from 'hooks/useFormValidation';

import { FieldSet, InputField, Button } from 'components/@common';

import { REQUEST_STATUS } from 'constants/';
import { getFormData } from 'lib/formUtils';
import { userValidator } from 'lib/validateUtils';

import * as S from './styles';

const nicknameValidation = {
  nickname: ({ nickname }) => userValidator.nickname(nickname),
  password: ({ password }) => userValidator.password(password),
};

function NicknameEdit() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    errorList: nicknameErrorList,
    isAllPassed: isNicknameAllPassed,
    validationForm: nicknameValidationForm,
  } = useFormValidation(nicknameValidation);

  const { userInfoAsyncState } = useSelector((state) => state.members);
  const { error: errorMessage } = userInfoAsyncState;

  const handleNicknameValidate = ({ target }) => {
    if (target.tagName !== 'INPUT') return;

    const formData = getFormData(target.form);

    nicknameValidationForm({ name: target.name, formData });
  };

  const handleEditNickname = async (event) => {
    event.preventDefault();

    const { newNickname, password } = getFormData(event.target);
    const response = await dispatch(membersThunk.userNicknameEdit({ newNickname, password }));

    if (response.status === REQUEST_STATUS.FAIL) return;

    alert('닉네임이 변경되었습니다');

    navigate('/');
  };

  return (
    <S.NicknameContainer onBlur={handleNicknameValidate} onSubmit={handleEditNickname}>
      <FieldSet labelText="닉네임">
        <InputField
          name="nickname"
          type="text"
          status={nicknameErrorList.userId ? 'danger' : 'default'}
          message={nicknameErrorList.nickname}
          placeholder="변경하고 싶은 닉네임을 입력해주세요"
          width="100%"
        />
        <InputField
          name="password"
          type="password"
          placeholder="현재 비밀번호를 입력하세요"
          message={nicknameErrorList.password === '' && errorMessage}
          width="100%"
        />
      </FieldSet>

      <Button type="submit" status="primary" isDisabled={!isNicknameAllPassed}>
        닉네임 변경
      </Button>
    </S.NicknameContainer>
  );
}

export default NicknameEdit;
