import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import userThunk from 'store/user/thunk';

import useDispatchEvent from 'hooks/useDispatchEvent';

import { Button, FlexContainer } from 'components/@common';
import FieldSet from 'components/@common/FieldSet';
import InputField from 'components/@common/InputField';

import { PAGE_LIST } from 'constants/';
import { getFormData } from 'lib/formUtils';

import * as S from './styles';

function LoginPage() {
  const { error: errorMessage } = useSelector(({ user }) => user.userInfoAsyncState);

  const { dispatchEvent } = useDispatchEvent();
  const navigate = useNavigate();
  const { state: pageState = {} } = useLocation();

  const handleSubmit = (event) => {
    event.preventDefault();

    const { userId, password } = getFormData(event.target);

    dispatchEvent({
      action: userThunk.userLogin(userId, password),
      onStateUpdated: ({ user }) => {
        user.isLogin && navigate(pageState ? pageState.targetUrl : '/');
      },
    });
  };

  return (
    <S.Container onSubmit={handleSubmit}>
      <FieldSet labelText="이메일">
        <InputField
          name="userId"
          type="text"
          status={errorMessage && 'danger'}
          placeholder="이메일을 입력하여주세요."
        />
      </FieldSet>

      <FieldSet labelText="비밀번호">
        <InputField
          name="password"
          type="password"
          status={errorMessage && 'danger'}
          message={errorMessage}
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
