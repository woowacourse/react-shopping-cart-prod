import Input from 'components/Common/Input/Input';
import Title from 'components/Common/Title/Title';
import Button from 'components/Common/Button/Button';
import Fieldset from 'components/Common/Fieldset/Fieldset';
import * as Styled from './style';
import ValidateText from 'components/Common/ValidateText/ValidateText';
import useInputValidate from 'hooks/useInputValidate';
import { useRef } from 'react';

const SignUp = () => {
  const pwd = useRef(null);
  const [emailValidate, handleEmailBlur] = useInputValidate('email');
  const [nameValidate, handleNameBlur] = useInputValidate('name');
  const [passwordValidate, handlePasswordBlur] = useInputValidate('password');
  const [passwordCheckValidate, handlePasswordCheckBlur] =
    useInputValidate('passwordCheck');

  const handlSubmit = (e) => {
    e.preventDefault();

    const isAllValid =
      emailValidate.isValid &&
      nameValidate.isValid &&
      passwordValidate.isValid &&
      passwordCheckValidate.isValid;

    if (!isAllValid) {
      alert('제대로 입력하세요.');
      return;
    }

    const {
      email: { value: email },
      name: { value: name },
      password: { value: password },
    } = e.target.elements;

    console.log('handlSubmit', email, name, password);
  };

  return (
    <Styled.Wrapper>
      <Title contents="회원가입" />
      <Styled.Form onSubmit={handlSubmit}>
        <Fieldset>
          <Input
            description="이메일"
            placeholder="coke@coke.com"
            onBlur={handleEmailBlur()}
            type="email"
            name="email"
          />
          <ValidateText
            text={emailValidate.text}
            isValid={emailValidate.isValid}
          />
        </Fieldset>
        <Fieldset>
          <Input
            description="이름"
            placeholder="이름을 입력해주세요."
            onBlur={handleNameBlur()}
            name="name"
          />
          <ValidateText
            text={nameValidate.text}
            isValid={nameValidate.isValid}
          />
        </Fieldset>
        <Fieldset>
          <Input
            ref={pwd}
            description="비밀번호"
            placeholder="비밀번호를 입력해주세요."
            onBlur={handlePasswordBlur()}
            name="password"
          />
          <ValidateText
            text={passwordValidate.text}
            isValid={passwordValidate.isValid}
          />
        </Fieldset>
        <Fieldset>
          <Input
            description="비밀번호 확인"
            placeholder="비밀번호를 확인해주세요."
            onBlur={handlePasswordCheckBlur(pwd.current?.value)}
            name="passwordCheck"
          />
          <ValidateText
            text={passwordCheckValidate.text}
            isValid={passwordCheckValidate.isValid}
          />
        </Fieldset>
        <Button colorType="primary" type="submit">
          가입하기
        </Button>
      </Styled.Form>
    </Styled.Wrapper>
  );
};

export default SignUp;
