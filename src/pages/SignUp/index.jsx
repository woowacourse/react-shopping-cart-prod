import Input from 'components/Common/Input/Input';
import Title from 'components/Common/Title/Title';
import Button from 'components/Common/Button/Button';
import Fieldset from 'components/Common/Fieldset/Fieldset';
import * as Styled from './style';
import ValidateText from 'components/Common/ValidateText/ValidateText';
import { useState } from 'react';

// 영문 소문자만 가능
// 빈 값이나 공백 불가능
// 특수문자 (-) (_) 이외 불가능
// 이메일 여부 (@) 확인
// API 요청하여 중복 여부 확인
// 소문자만 있는가 ? -> 소문자 = lowerCase / 만 => only / isLowerCaseOnly

const validateEmail = (email) => {
  console.log('validateEmail email', email);
  const isValid =
    /^[0-9a-z]([-_]?[0-9a-z])*@[0-9a-z]([-_.]?[0-9a-z])*\.[a-z]{2,3}$/.test(
      email,
    );

  if (isValid) return { text: '멋진 이메일입니다!', isValid };

  return {
    text: '영문 소문자, 숫자,특수기호(_)(-)만 사용 가능합니다.',
    isValid,
  };
};

const useValidate = (type) => {
  const [validation, setValidation] = useState({ text: '', isValid: false });

  const handleBlur = (e) => {
    console.log('handleBlur');
    // func[validateType]();
    if (type === 'email') {
      console.log('e.target.value', e.target.value);
      setValidation(validateEmail(e.target.value));
    }
  };
  // 영문 소문자, 숫자,특수기호(_)(-)만 사용 가능합니다.
  // 멋진 이메일입니다!

  return [validation, handleBlur];
};

const SignUp = () => {
  const [emailValidate, handleEmailBlur] = useValidate('email');

  return (
    <Styled.Wrapper>
      <Title contents="회원가입" />
      <Styled.Form>
        <Fieldset>
          <Input
            description="이메일"
            placeholder="coke@coke.com"
            onBlur={handleEmailBlur}
            type="email"
          />
          <ValidateText
            text={emailValidate.text}
            isValid={emailValidate.isValid}
          />
        </Fieldset>
        <Fieldset>
          <Input description="이름" placeholder="이름을 입력해주세요." />
        </Fieldset>
        <Fieldset>
          <Input
            description="비밀번호"
            placeholder="비밀번호를 입력해주세요."
          />
        </Fieldset>
        <Fieldset>
          <Input
            description="비밀번호 확인"
            placeholder="비밀번호를 확인해주세요."
          />
        </Fieldset>
        <Button colorType="primary">가입하기</Button>
      </Styled.Form>
    </Styled.Wrapper>
  );
};

export default SignUp;
