import AuthPage from 'components/common/AuthPage';
import LabeledInput from 'components/common/LabeledInput';
import Snackbar, { MESSAGE } from 'components/common/Snackbar';
import useInput from 'hooks/useInput';
import useSnackBar from 'hooks/useSnackBar';

const Signup = () => {
  const [email, onChangeEmail] = useInput();
  const [password, onChangePassword] = useInput();
  const [passwordConfirmation, onChangePasswordConfirmation] = useInput();
  const { isOpenSnackbar, openSnackbar } = useSnackBar();

  const onSubmitAuthForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password === passwordConfirmation) {
      return;
    }
    openSnackbar();
  };

  return (
    <AuthPage title='회원가입' onSubmitAuthForm={onSubmitAuthForm}>
      <LabeledInput
        label='이메일'
        id='email'
        type='email'
        placeholder='이메일 주소를 입력해주세요'
        value={email}
        onChange={onChangeEmail}
      />
      <LabeledInput label='이름' id='name' type='text' placeholder='이름을 입력해주세요' />
      <LabeledInput
        label='비밀번호'
        id='password'
        type='password'
        placeholder='비밀번호를 입력해주세요'
        pattern='^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}'
        title='비밀번호는 대문자, 숫자, 소문자, 특수문자로 조합된 8 ~ 15자이여야 합니다.'
        value={password}
        onChange={onChangePassword}
      />
      <LabeledInput
        label='비밀번호 확인'
        id='password'
        type='password'
        placeholder='비밀번호를 입력해주세요'
        value={passwordConfirmation}
        onChange={onChangePasswordConfirmation}
      />
      {isOpenSnackbar && <Snackbar message={MESSAGE.password} />}
    </AuthPage>
  );
};

export default Signup;
