import cn from "classnames";
import { Link } from "react-router-dom";
import LabeledInput from "@shared/input/labeled-input/LabeledInput";
import Button from "@shared/button/Button";
import AuthFormTemplate from "../../templates/auth-form-template/AuthFormTemplate";
import useForm from "../../hooks/useForm/useForm";
import LocalStorage from "../../storage/localStorage";
import styles from "./login.module";
import requestAccessToken from "../../remote/accessToken";

function Login({ className }) {
  const { onSubmit, register } = useForm();

  const login = async (email, password) => {
    const accessToken = await requestAccessToken(email, password);
    if (!accessToken) {
      alert("로그인에 실패했습니다");
      return;
    }
    LocalStorage.setItem("accessToken", accessToken);
    window.location.href = "/";
  };

  const handleSubmit = (data, error) => {
    const { email, password } = data;
    login(email, password);
  };

  return (
    <div className="wrapper">
      <AuthFormTemplate className={className}>
        <AuthFormTemplate.Title>로그인</AuthFormTemplate.Title>
        <AuthFormTemplate.Content>
          <form
            onSubmit={onSubmit(handleSubmit)}
            className={cn(styles.loginForm, "mb-20")}
          >
            <LabeledInput
              label="이메일"
              className="mb-16"
              id="email"
              placeholder="woowacourse@gmail.com"
              {...register("email", {
                pattern: {
                  value: /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: "정규식 실패할때 나올 메세지",
                },
              })}
            />
            <LabeledInput
              label="비밀번호"
              className="mb-40"
              id="password"
              type="password"
              placeholder="비밀번호를 입력해주세요"
              {...register("password")}
            />
            <Button variant="primary" size="md" block type="submit">
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

export default Login;
