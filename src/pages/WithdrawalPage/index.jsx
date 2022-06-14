import { useNavigate } from 'react-router-dom';

import useFetch from 'hooks/useFetch';
import useForm from 'hooks/useForm';

import { Title, Icon, FieldSet, InputField, Button, Checkbox } from 'components/@common';

import { requestUserDropOut } from 'api/members';
import { ICON_CODE, PAGE_LIST } from 'constants/';
import { getFormData } from 'lib/formUtils';
import { userValidator } from 'lib/validateUtils';

import * as S from './styles';

export function WithdrawalPage() {
  const navigate = useNavigate();
  const validationList = {
    password: ({ password }) => userValidator.password(password),
  };
  const { errorList, onChangeInput, onBlurInput, createFormSubmitEvent } = useForm(validationList);
  const { fetchControl, error: errorMessage } = useFetch(requestUserDropOut);

  const isError = errorList.password || errorMessage;

  const onSubmitForm = createFormSubmitEvent((event) => {
    const formData = getFormData(event.target);

    if (formData.accept !== 'on') {
      alert('회원 탈퇴 전 동의사항에 체크해주세요.');
      return;
    }

    if (confirm('정말 회원 탈퇴를 진행하시겠습니까?') === false) {
      return;
    }

    fetchControl.start(formData.password, {
      success: () => {
        alert('회원 탈퇴가 완료되었습니다.\n싱싱청과물을 이용해주셔서 감사합니다.');
        navigate(PAGE_LIST.LOGOUT);
      },
    });
  });

  return (
    <>
      <Title description="싱싱청과물의 회원 탈퇴를 신청하고, 개인 정보를 즉시 파기하실 수 있습니다.">
        <Icon icon={ICON_CODE.EXIT} />
        회원 탈퇴
      </Title>

      <S.Container onChange={onChangeInput} onSubmit={onSubmitForm}>
        <FieldSet
          labelText="비밀번호 확인"
          description="로그인 시 사용한 비밀번호를 다시 한번 입력해주세요."
        >
          <InputField
            name="password"
            type="password"
            status={isError && 'danger'}
            placeholder="비밀번호 확인"
            message={isError && '비밀번호가 올바르지 않습니다.'}
            width="100%"
          />
        </FieldSet>

        <Checkbox name="accept">
          회원 탈퇴 시 즉시 계정 정보가 삭제되며, 삭제된 정보는 복구할 수 없습니다.
        </Checkbox>

        <Button type="submit" status="primary" width="100%">
          회원 탈퇴
        </Button>
      </S.Container>
    </>
  );
}

export default WithdrawalPage;
