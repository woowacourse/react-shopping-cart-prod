import authAPI from 'apis/auth';
import { Button, Form, Input, Link } from 'components/@shared';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userActions } from 'redux/actions';
import { createInputValueGetter } from 'utils/dom';

import { USER_MESSAGE } from 'constants/message';
import PATH from 'constants/path';

import * as S from './LoginForm.styled';

function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!(e.target instanceof HTMLFormElement)) return;

    const formElement = e.target.elements;
    const getInputValue = createInputValueGetter(formElement);
    const user = {
      username: getInputValue('username'),
      password: getInputValue('password'),
    };

    try {
      const userInfo = await authAPI.login(user);

      dispatch(userActions.setUser(userInfo));
      navigate(PATH.BASE);
    } catch (error) {
      if (error instanceof Error) {
        alert(USER_MESSAGE.FAIL_LOGIN);
      }
    }
  };

  return (
    <Form onSubmit={onSubmitForm}>
      <Input
        id="username"
        type="text"
        placeholder="아이디를 입력해주세요"
        required
      >
        아이디
      </Input>
      <Input
        id="password"
        type="password"
        placeholder="비밀번호를 입력해주세요"
        required
      >
        비밀번호
      </Input>
      <S.LoginHelper>
        <S.FindLoginInfo>
          <Link to="#">아이디 찾기</Link>
          <Link to="#">비밀번호 찾기</Link>
        </S.FindLoginInfo>
      </S.LoginHelper>
      <Button type="submit" marginTop="20px">
        로그인
      </Button>
    </Form>
  );
}

export default LoginForm;
