import AuthPage from 'components/common/AuthPage';
import LabeledInput from 'components/common/LabeledInput';

const Signup = () => {
  const onSubmitAuthForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <AuthPage title='회원가입' onSubmitAuthForm={onSubmitAuthForm}>
      <LabeledInput
        label='이메일'
        id='email'
        type='email'
        placeholder='이메일 주소를 입력해주세요'
      />
      <LabeledInput label='이름' id='name' type='text' placeholder='이름을 입력해주세요' />
      <LabeledInput
        label='비밀번호'
        id='password'
        type='password'
        placeholder='비밀번호를 입력해주세요'
      />
      <LabeledInput
        label='비밀번호 확인'
        id='password'
        type='password'
        placeholder='비밀번호를 입력해주세요'
      />
    </AuthPage>
  );
};

export default Signup;
