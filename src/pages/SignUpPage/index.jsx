import { Link, useNavigate } from 'react-router-dom';

import useFormValidation from 'hooks/useFormValidation';

import { Button, FlexContainer } from 'components/@common';
import FieldSet from 'components/@common/FieldSet';
import InputField from 'components/@common/InputField';

import { requestSignUp } from 'api/members';
import { REQUEST_STATUS } from 'constants/';
import { getFormData } from 'lib/formUtils';
import { userValidator } from 'lib/validateUtils';

import * as S from './styles';

function SignUpPage() {
  const navigate = useNavigate();

  const validationList = {
    userId: ({ userId }) => userValidator.userId(userId),
    password: ({ password }) => userValidator.password(password),
    passwordConfirm: ({ password, passwordConfirm }) =>
      userValidator.passwordConfirm(password, passwordConfirm),
    nickname: ({ nickname }) => userValidator.nickname(nickname),
  };

  const { errorList, isAllPassed, validationForm } = useFormValidation(validationList);

  const handleInputValidate = ({ target }) => {
    if (target.tagName !== 'INPUT') return;

    const formData = getFormData(target.form);

    validationForm({ name: target.name, formData });
  };

  const handleSubmitSignUp = async (event) => {
    event.preventDefault();

    const formData = getFormData(event.target);
    const { status, message } = await requestSignUp(formData);

    if (status === REQUEST_STATUS.FAIL) {
      alert(message);
      return;
    }

    navigate('/login');
  };

  return (
    <S.Container onBlur={handleInputValidate} onSubmit={handleSubmitSignUp}>
      <FieldSet labelText="이메일">
        <InputField
          name="userId"
          type="text"
          status={errorList.userId ? 'danger' : 'default'}
          message={errorList.userId}
          placeholder="로그인 시 사용할 이메일"
        />
      </FieldSet>

      <FieldSet labelText="비밀번호">
        <InputField
          name="password"
          type="password"
          status={errorList.password ? 'danger' : 'default'}
          message={errorList.password}
          placeholder="영문, 숫자, 특수문자 조합 최소 8자 최대 16자"
        />

        <InputField
          name="passwordConfirm"
          type="password"
          status={errorList.passwordConfirm ? 'danger' : 'default'}
          message={errorList.passwordConfirm}
          placeholder="비밀번호 재입력"
        />
      </FieldSet>

      <FieldSet labelText="닉네임">
        <InputField
          name="nickname"
          type="text"
          status={errorList.nickname ? 'danger' : 'default'}
          message={errorList.nickname}
          placeholder="영문, 한글, 숫자로 최소 2자, 최대 10자"
        />
      </FieldSet>

      <FlexContainer gap={20}>
        <Button type="submit" status="primary" isDisabled={!isAllPassed}>
          회원가입
        </Button>
        <S.NonMemberText>
          싱싱청과물, <Link to="/">비회원으로 계속하기</Link>
        </S.NonMemberText>
      </FlexContainer>
    </S.Container>
  );
}

SignUpPage.propTypes = {};

SignUpPage.defaultPages = {};

export default SignUpPage;
