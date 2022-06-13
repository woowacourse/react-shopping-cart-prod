import useFetch from 'hooks/useFetch';
import useForm from 'hooks/useForm';

import { Button, FieldSet, InputField } from 'components/@common';

import { requestPasswordConfirm } from 'api/members';
import { getFormData } from 'lib/formUtils';
import { userValidator } from 'lib/validateUtils';

import * as S from '../../styles';

function ConfirmPassword({ setAuthPassed }) {
  const validationList = {
    password: ({ password }) => userValidator.password(password),
  };

  const { errorList, onBlurInput, onChangeInput, onSubmitForm } = useForm(validationList);
  const { fetchControl, isLoading, error: fetchError } = useFetch(requestPasswordConfirm);

  const isError = errorList.password || fetchError;

  const handleConfirmSubmit = (event) => {
    const formData = getFormData(event.target);

    fetchControl.start(formData.password, {
      success: () => setAuthPassed(formData.password),
    });
  };

  return (
    <S.Container
      onChange={onChangeInput}
      onBlur={onBlurInput}
      onSubmit={onSubmitForm(handleConfirmSubmit)}
    >
      <FieldSet
        labelText="비밀번호 확인"
        description="로그인 시 사용한 비밀번호를 다시 한번 입력해주세요."
      >
        <InputField
          name="password"
          type="password"
          status={isError && 'danger'}
          message={isError && '비밀번호가 올바르지 않습니다.'}
          placeholder="비밀번호 확인"
          width="100%"
        />
      </FieldSet>

      <Button type="submit" status="primary" width="100%" isDisabled={isLoading}>
        회원정보 편집
      </Button>
    </S.Container>
  );
}

export default ConfirmPassword;
