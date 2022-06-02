import cn from "classnames";
import { Link, useNavigate } from "react-router-dom";
import LabeledInput from "@shared/input/labeled-input/LabeledInput";
import Button from "@shared/button/Button";
import styles from "./signup.module";
import AuthFormTemplate from "../../templates/auth-form-template/AuthFormTemplate";
import useForm from "../../hooks/useForm/useForm";

function Signup({ className }) {
  const { onSubmit, register } = useForm();
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    const { email, password, username } = formData;
    // eslint-disable-next-line no-undef
    const response = await fetch(`${API_URL}/customers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        username,
      }),
    });
    if (!response.ok) {
      alert("이미 존재하는 이메일 입니다");
      return;
    }
    navigate("/login", { replace: true });
  };

  return (
    <div className="wrapper">
      <AuthFormTemplate className={className}>
        <AuthFormTemplate.Title>회원가입</AuthFormTemplate.Title>
        <AuthFormTemplate.Content>
          <form
            onSubmit={onSubmit(handleSubmit)}
            className={cn(styles.signupForm, "mb-20")}
          >
            <LabeledInput
              label="이메일"
              className="mb-16"
              id="email"
              name="email"
              placeholder="woowacourse@gmail.com"
              {...register("email", {
                pattern: {
                  value: /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: "정규식 실패할때 나올 메세지",
                },
              })}
            />
            <LabeledInput
              label="이름"
              className="mb-16"
              id="username"
              placeholder="이름을 입력해주세요"
              {...register("username")}
            />
            <LabeledInput
              label="비밀번호"
              className="mb-16"
              id="password"
              type="password"
              placeholder="비밀번호를 입력해주세요"
              {...register("password", {
                pattern: {
                  value:
                    /^.*(?=^.{8,12}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/,
                  message: "비밀번호 정규식 실패할때 나올 메세지",
                },
              })}
            />
            <LabeledInput
              label="비밀번호 확인"
              className="mb-40"
              id="confirm-password"
              type="password"
              name="confirm-password"
              placeholder="비밀번호를 입력해주세요"
              {...register("confirm-password")}
            />
            <Button variant="primary" size="sm" block type="submit">
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

export default Signup;
