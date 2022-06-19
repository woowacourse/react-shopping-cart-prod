import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import * as membersThunk from 'actions/members/thunk';

import useFormValidation from 'hooks/useFormValidation';

import { FieldSet, InputField, Button } from 'components/@common';

import { REQUEST_STATUS } from 'constants/';
import { getFormData } from 'lib/formUtils';
import { userValidator } from 'lib/validateUtils';

import * as S from './styles';

const dropOutValidation = {
  password: ({ password }) => userValidator.password(password),
};

function DropOutUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    errorList: dropOutErrorList,
    isAllPassed: isDropOutAllPassed,
    validationForm: dropOutValidationForm,
  } = useFormValidation(dropOutValidation);

  const { userInfoAsyncState } = useSelector((state) => state.members);
  const { error: errorMessage } = userInfoAsyncState;

  const handleDropOutValidate = ({ target }) => {
    if (target.tagName !== 'INPUT') return;

    const formData = getFormData(target.form);

    dropOutValidationForm({ name: target.name, formData });
  };

  const handleUserDropOut = async (event) => {
    event.preventDefault();

    const { password } = getFormData(event.target);

    const response = await dispatch(membersThunk.userDropOut({ password }));

    if (response.status === REQUEST_STATUS.FAIL) return;

    alert('회원탈퇴가 처리되었습니다');

    navigate('/');
  };

  return (
    <S.DropOutContainer onBlur={handleDropOutValidate} onSubmit={handleUserDropOut}>
      <FieldSet labelText="회원탈퇴">
        <InputField
          name="password"
          type="password"
          message={dropOutErrorList.password === '' && errorMessage}
          placeholder="현재 비밀번호를 입력하세요"
          width="100%"
        />
      </FieldSet>

      <Button type="submit" status="primary" isDisabled={!isDropOutAllPassed}>
        탈퇴하기
      </Button>
    </S.DropOutContainer>
  );
}

export default DropOutUser;
