import cn from "classnames";
import { Link, useNavigate } from "react-router-dom";
import LabeledInput from "@shared/input/labeled-input/LabeledInput";
import Button from "@shared/button/Button";
import { useState } from "react";
import styles from "./signup.module";
import AuthFormTemplate from "../../templates/auth-form-template/AuthFormTemplate";
import useForm from "../../hooks/useForm/useForm";

function Signup({ className }) {
  const { onSubmit, register, formData, errors } = useForm();
  const navigate = useNavigate();
  const disabled = Object.keys(errors).some(
    (inputName) => !!errors[inputName] || !formData[inputName]
  );

  const handleSubmit = async (formData, errors) => {
    const { email, password, username, confirmPassword } = formData;

    const errorInputName = Object.keys(errors)[0];

    if (errors[errorInputName]) {
      alert(errors[errorInputName]);
      return;
    }

    // (임시방편) 실시간 체크가 안되기 때문에 여기서 검사를 해준다
    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다");
      return;
    }

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

  const validateConfirmNewPassword = (value) => {
    if (formData.password !== value) {
      return {
        isValid: false,
        errorMessage: "비밀번호를 동일하게 입력해 주세요",
      };
    }
    return {
      isValid: true,
      errorMessage: null,
    };
  };

  return (
    <div className="wrapper">
      <AuthFormTemplate className={className}>
        <AuthFormTemplate.Title>회원가입</AuthFormTemplate.Title>
        <AuthFormTemplate.Content>
          <form
            onSubmit={onSubmit(handleSubmit)}
            className={cn(styles.signupForm, "mb-20")}
            disabled={disabled}
          >
            <LabeledInput
              label="이메일"
              className="mb-24"
              id="email"
              placeholder="woowacourse@gmail.com"
              feedback={errors.email}
              {...register("email", {
                pattern: {
                  value: /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: "이메일 형식을 지켜주세요",
                },
              })}
            />

            <LabeledInput
              label="이름"
              className="mb-24"
              id="username"
              placeholder="이름을 입력해주세요"
              feedback={errors.username}
              {...register("username", {
                pattern: {
                  value: /^.{1,10}$/,
                  message: "이름은 1 ~ 10자 이내로 입력해 주세요",
                },
              })}
            />
            <LabeledInput
              label="비밀번호"
              className="mb-24"
              id="password"
              type="password"
              placeholder="비밀번호를 입력해주세요"
              feedback={errors.password}
              {...register("password", {
                pattern: {
                  value:
                    /^.*(?=^.{8,12}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/,
                  message:
                    "영문,숫자,특수문자의 조합으로 8 ~ 12글자를 입력해 주세요",
                },
              })}
            />
            <LabeledInput
              label="비밀번호 확인"
              className="mb-40"
              id="confirm-password"
              type="password"
              placeholder="비밀번호를 입력해주세요"
              feedback={errors.confirmPassword}
              {...register("confirmPassword", {
                customValidator: validateConfirmNewPassword,
              })}
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

export default Signup;
