import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

<<<<<<< HEAD
import userThunk from 'store/user/thunk';
=======
import * as membersThunk from 'actions/members/thunk';
>>>>>>> 68aa226472f257aae4442d058ba944e087c68854

import { Button, FlexContainer } from 'components/@common';
import FieldSet from 'components/@common/FieldSet';
import InputField from 'components/@common/InputField';

import { PAGE_LIST } from 'constants/';
import { getFormData } from 'lib/formUtils';

import * as S from './styles';

function LoginPage() {
<<<<<<< HEAD
  const { userInfoAsyncState, isLogin } = useSelector(({ user }) => user);
=======
  const { userInfoAsyncState, isLoggedIn } = useSelector((state) => state.members);
>>>>>>> 68aa226472f257aae4442d058ba944e087c68854
  const { error: errorMessage } = userInfoAsyncState;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
<<<<<<< HEAD
    isLogin && navigate('/');
  }, [isLogin]);
=======
    isLoggedIn && navigate('/');
  }, [isLoggedIn]);
>>>>>>> 68aa226472f257aae4442d058ba944e087c68854

  const handleSubmit = (event) => {
    event.preventDefault();

    const { userId, password } = getFormData(event.target);

<<<<<<< HEAD
    dispatch(userThunk.userLogin(userId, password));
=======
    dispatch(membersThunk.userLogin({ userId, password }));
>>>>>>> 68aa226472f257aae4442d058ba944e087c68854
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
