import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import * as membersThunk from 'actions/members/thunk';

import { Button, FlexContainer } from 'components/@common';
import FieldSet from 'components/@common/FieldSet';
import InputField from 'components/@common/InputField';

import { PAGE_LIST } from 'constants/';
import { getFormData } from 'lib/formUtils';

import * as S from './styles';

function LoginPage() {
  const { userInfoAsyncState, isLoggedIn } = useSelector((state) => state.members);
  const { error: errorMessage } = userInfoAsyncState;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    isLoggedIn && navigate('/');
  }, [isLoggedIn]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const { userId, password } = getFormData(event.target);

    dispatch(membersThunk.userLogin({ userId, password }));
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
