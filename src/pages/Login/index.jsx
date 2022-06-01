import Form from 'components/Common/Form/Form';
import Fieldset from 'components/Common/Fieldset/Fieldset';
import Input from 'components/Common/Input/Input';
import Button from 'components/Common/Button/Button';
import Title from 'components/Common/Title/Title';
import { showSnackBar } from 'reducers/ui/ui.actions';
import * as Styled from './style';
import { useDispatch } from 'react-redux';

const Login = () => {
  const dispatch = useDispatch();
  const handlSubmit = (e) => {
    e.preventDefault();

    const {
      email: { value: email },
      password: { value: password },
    } = e.target.elements;

    if (email.length === 0 || password.length === 0) {
      dispatch(
        showSnackBar({ type: 'ERROR', text: '정보를 올바르게 입력하세요.' }),
      );
      return;
    }

    dispatch(showSnackBar({ type: 'SUCCESS', text: '로그인 성공' }));
  };
  return (
    <Styled.Wrapper>
      <Title contents="로그인" />
      <Form onSubmit={handlSubmit}>
        <Fieldset>
          <Input
            description="이메일"
            placeholder="coke@coke.com"
            type="email"
            name="email"
          />
        </Fieldset>
        <Fieldset>
          <Input
            description="비밀번호"
            placeholder="비밀번호를 입력해주세요."
            type="password"
            name="password"
          />
        </Fieldset>
        <Button colorType="primary" type="submit">
          로그인
        </Button>
      </Form>
    </Styled.Wrapper>
  );
};

export default Login;
