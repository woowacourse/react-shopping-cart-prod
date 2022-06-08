import useFetch from 'hooks/useFetch';
import useFormValidation from 'hooks/useFormValidation';

import { Button, FieldSet, InputField } from 'components/@common';

import { requestPasswordConfirm } from 'api/members';
import { userValidator } from 'lib/validateUtils';

import * as S from '../../styles';

function ConfirmPassword({ setAuthPassed }) {
  const validationList = {
    password: ({ password }) => userValidator.password(password),
  };

  const { errorList, onBlurTextField, onSubmitForm } = useFormValidation(validationList);
  const { fetchControl, isLoading } = useFetch(requestPasswordConfirm);

  const fetchConfirmPassword = (formData) => {
    if (errorList.password) {
      alert('비밀번호가 올바르지 않습니다.');
      return;
    }

    fetchControl.start(formData.password, {
      success: () => setAuthPassed(formData.password),
      error: (errorMessage) => alert(errorMessage),
    });
  };

  return (
    <S.Container onBlur={onBlurTextField} onSubmit={onSubmitForm(fetchConfirmPassword)}>
      <FieldSet
        labelText="비밀번호 확인"
        description="로그인 시 사용한 비밀번호를 다시 한번 입력해주세요."
      >
        <InputField name="password" type="password" placeholder="비밀번호 확인" width="100%" />
      </FieldSet>

      <Button type="submit" status="primary" width="100%" isDisabled={isLoading}>
        회원정보 편집
      </Button>
    </S.Container>
  );
}

export default ConfirmPassword;
