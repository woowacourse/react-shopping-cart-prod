import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import cn from "classnames";

import { signup } from "@redux/reducers/user/userThunks";

import LabeledInput from "@components/Input/LabeledInput/LabeledInput";
import Button from "@components/Button";

import useInput from "@hooks/useInput";
import useAuthGuard from "@hooks/useAuthGuard";

import {
  emailValidator,
  passwordValidator,
  usernameValidator,
  confirmPasswordValidator,
} from "@utils/validators";

import AuthFormTemplate from "../../templates/auth-form-template/AuthFormTemplate";
import { USER_ACCESS_POLICY } from "../../constants";

import styles from "./SignUpPage.module";

function SignUpPage({ className }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const checkUserAccessPolicy = useAuthGuard({
    policy: USER_ACCESS_POLICY.ONLY_LOGGED_OUT,
  });

  const {
    state: email,
    handleChange: handleChangeEmail,
    validation: emailValidation,
  } = useInput("", emailValidator);

  const {
    state: username,
    handleChange: handleChangeUsername,
    validation: usernameValidation,
  } = useInput("", usernameValidator);

  const {
    state: password,
    handleChange: handleChangePassword,
    validation: passwordValidation,
  } = useInput("", passwordValidator);

  const {
    state: confirmPassword,
    handleChange: handleChangeConfirmPassword,
    validation: confirmPasswordValidation,
  } = useInput("", confirmPasswordValidator(password));

  const disabled =
    !emailValidation.isValid ||
    !usernameValidation.isValid ||
    !passwordValidation.isValid ||
    !confirmPasswordValidation.isValid;

  const handleSubmitSignUpForm = () => {
    dispatch(signup({ email, password, username }));
    navigate("/login", { replace: true });
  };

  useEffect(() => {
    checkUserAccessPolicy();
  }, [checkUserAccessPolicy]);

  return (
    <div className="wrapper">
      <AuthFormTemplate className={className}>
        <AuthFormTemplate.Title>회원가입</AuthFormTemplate.Title>
        <AuthFormTemplate.Content>
          <form
            onSubmit={handleSubmitSignUpForm}
            className={cn(styles.signupForm, "mb-20")}
          >
            <LabeledInput
              label="이메일"
              className="mb-40"
              id="email"
              placeholder="woowacourse@gmail.com"
              value={email}
              feedback={emailValidation.errorMessage}
              onChange={(e) => handleChangeEmail(e.target.value)}
            />
            <LabeledInput
              label="이름"
              className="mb-40"
              id="username"
              placeholder="이름을 입력해주세요"
              value={username}
              feedback={usernameValidation.errorMessage}
              onChange={(e) => handleChangeUsername(e.target.value)}
            />
            <LabeledInput
              label="비밀번호"
              className="mb-40"
              id="password"
              type="password"
              placeholder="비밀번호를 입력해주세요"
              value={password}
              feedback={passwordValidation.errorMessage}
              onChange={(e) => handleChangePassword(e.target.value)}
            />
            <LabeledInput
              label="비밀번호 확인"
              className="mb-40"
              id="confirm-password"
              type="password"
              placeholder="비밀번호를 입력해주세요"
              value={confirmPassword}
              feedback={confirmPasswordValidation.errorMessage}
              onChange={(e) => handleChangeConfirmPassword(e.target.value)}
            />
            <Button
              variant="primary"
              size="md"
              block
              type="submit"
              disabled={disabled}
            >
              가입하기
            </Button>
          </form>
        </AuthFormTemplate.Content>
        <AuthFormTemplate.Footer>
          <div className={styles.moreAction}>
            <span>이미 회원이신가요?</span>
            <Link to="/login">로그인</Link>
          </div>
        </AuthFormTemplate.Footer>
      </AuthFormTemplate>
    </div>
  );
}

export default SignUpPage;
