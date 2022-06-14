import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import userThunk from 'store/user/thunk';

import useDispatchEvent from 'hooks/useDispatchEvent';
import useForm from 'hooks/useForm';

import { Button, FlexContainer } from 'components/@common';
import FieldSet from 'components/@common/FieldSet';
import InputField from 'components/@common/InputField';

import { PAGE_LIST } from 'constants/';
import { getFormData } from 'lib/formUtils';
import { userValidator } from 'lib/validateUtils';

import * as S from './styles';

function LoginPage() {
  const { dispatchEvent } = useDispatchEvent();
  const { error: serverErrorMessage } = useSelector(({ user }) => user.userInfoAsyncState);

  const navigate = useNavigate();
  const { state: pageState = {} } = useLocation();

  const validationList = {
    userId: ({ userId }) => userValidator.userId(userId, false),
    password: ({ password }) => userValidator.password(password),
  };

  const { onChangeInput, createFormSubmitEvent, errorList } = useForm(validationList);
  const isError = errorList.userId || errorList.password || serverErrorMessage;

  const onSubmitLogin = createFormSubmitEvent((event) => {
    const { userId, password } = getFormData(event.target);

    dispatchEvent({
      action: userThunk.userLogin(userId, password),
      onStateUpdated: ({ user }) => {
        user.isLogin && navigate(pageState ? pageState.targetUrl : '/');
      },
    });
  });

  return (
    <S.Container onChange={onChangeInput} onSubmit={onSubmitLogin}>
      <FieldSet labelText="이메일">
        <InputField
          name="userId"
          type="text"
          status={isError && 'danger'}
          placeholder="이메일을 입력하여주세요."
        />
      </FieldSet>

      <FieldSet labelText="비밀번호">
        <InputField
          name="password"
          type="password"
          status={isError && 'danger'}
          message={isError && '아이디 또는 비밀번호를 확인하여주세요'}
          placeholder="비밀번호를 입력하여주세요."
        />
      </FieldSet>

      <FlexContainer gap={20}>
        <Button type="submit" status="primary">
          로그인
        </Button>
        <S.NonMemberText>
          싱싱청과물, <Link to={PAGE_LIST.SIGN_UP}>간편 회원가입하기</Link>
        </S.NonMemberText>
      </FlexContainer>
    </S.Container>
  );
}

export default LoginPage;
