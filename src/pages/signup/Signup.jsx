import cn from "classnames";
import { Link } from "react-router-dom";
import LabeledInput from "@shared/input/labeled-input/LabeledInput";
import Button from "@shared/button/Button";
import styles from "./signup.module";
import AuthFormTemplate from "../../templates/auth-form-template/AuthFormTemplate";

function Signup({ className }) {
  return (
    <div className="wrapper">
      <AuthFormTemplate className={className}>
        <AuthFormTemplate.Title>회원가입</AuthFormTemplate.Title>
        <AuthFormTemplate.Content>
          <form className={cn(styles.signupForm, "mb-20")}>
            <LabeledInput
              label="이메일"
              className="mb-16"
              id="email"
              name="email"
              placeholder="woowacourse@gmail.com"
              value=""
            />
            <LabeledInput
              label="이름"
              className="mb-16"
              id="name"
              name="name"
              placeholder="이름을 입력해주세요"
              value=""
            />
            <LabeledInput
              label="비밀번호"
              className="mb-16"
              id="password"
              type="password"
              name="password"
              placeholder="비밀번호를 입력해주세요"
              value=""
            />
            <LabeledInput
              label="비밀번호 확인"
              className="mb-40"
              id="confirm-password"
              type="password"
              name="confirm-password"
              placeholder="비밀번호를 입력해주세요"
              value=""
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
