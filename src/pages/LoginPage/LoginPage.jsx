import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import cn from "classnames";

import { login } from "@redux/reducers/user-reducer/userThunks";
import LabeledInput from "@components/Input/LabeledInput/LabeledInput";
import Button from "@components/Button";

import useInput from "@hooks/useInput";
import { emailValidator, passwordValidator } from "@utils/validators";

import AuthFormTemplate from "../../templates/auth-form-template/AuthFormTemplate";
import styles from "./LoginPage.module";

function LoginPage({ className }) {
  const dispatch = useDispatch();

  const {
    state: email,
    handleChange: handleChangeEmail,
    validation: emailValidation,
  } = useInput("", emailValidator);

  const {
    state: password,
    handleChange: handleChangePassword,
    validation: passwordValidation,
  } = useInput("", passwordValidator);

  const disabled = !emailValidation.isValid || !passwordValidation.isValid;

  const handleSubmitLoginForm = () => {
    dispatch(login({ email, password }));
  };

  return (
    <div className="wrapper">
      <AuthFormTemplate className={className}>
        <AuthFormTemplate.Title>로그인</AuthFormTemplate.Title>
        <AuthFormTemplate.Content>
          <form
            onSubmit={handleSubmitLoginForm}
            className={cn(styles.loginForm, "mb-20")}
            disabled={disabled}
          >
            <LabeledInput
              label="이메일"
              className="mb-16"
              id="email"
              placeholder="woowacourse@gmail.com"
              value={email}
              feedback={emailValidation.errorMessage}
              onChange={(e) => handleChangeEmail(e.target.value)}
            />
            <LabeledInput
              label="비밀번호"
              className="mb-40"
              id="password"
              type="password"
              placeholder="비밀번호를 입력해주세요"
              value={password}
              onChange={(e) => handleChangePassword(e.target.value)}
            />
            <Button
              variant="primary"
              size="md"
              block
              type="submit"
              disabled={disabled}
            >
              로그인
            </Button>
          </form>
        </AuthFormTemplate.Content>
        <AuthFormTemplate.Footer>
          <div className={styles.moreAction}>
            <span>아직 회원이 아니신가요?</span>
            <Link to="/signup">회원가입</Link>
          </div>
        </AuthFormTemplate.Footer>
      </AuthFormTemplate>
    </div>
  );
}

export default LoginPage;
