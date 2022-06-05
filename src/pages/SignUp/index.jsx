import useSignUpPage from './hook';
import Input from 'components/Common/Input/Input';
import Button from 'components/Common/Button/Button';
import Fieldset from 'components/Common/Fieldset/Fieldset';
import ValidateText from 'components/Common/ValidateText/ValidateText';
import Form from 'components/Common/Form/Form';

import * as Styled from './style';

const SignUp = () => {
  const {
    handleSignUp,
    emailValidate,
    handleEmailBlur,
    nameValidate,
    handleNameBlur,
    passwordValidate,
    handlePasswordBlur,
    passwordCheckValidate,
    handlePasswordCheckBlur,
    passwordRef,
  } = useSignUpPage();

  return (
    <Styled.Wrapper>
      <Form title="회원가입" onSubmit={handleSignUp}>
        <Fieldset>
          <Input
            description="이메일"
            placeholder="example@example.com"
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
            type="text"
          />
          <ValidateText
            text={nameValidate.text}
            isValid={nameValidate.isValid}
          />
        </Fieldset>
        <Fieldset>
          <Input
            ref={passwordRef}
            description="비밀번호"
            placeholder="비밀번호를 입력해주세요."
            onBlur={handlePasswordBlur()}
            name="password"
            type="password"
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
            onBlur={handlePasswordCheckBlur(passwordRef.current?.value)}
            name="passwordCheck"
            type="password"
          />
          <ValidateText
            text={passwordCheckValidate.text}
            isValid={passwordCheckValidate.isValid}
          />
        </Fieldset>
        <Button colorType="primary" type="submit">
          가입하기
        </Button>
      </Form>
    </Styled.Wrapper>
  );
};

export default SignUp;
