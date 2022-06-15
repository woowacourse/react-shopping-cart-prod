import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import cn from "classnames";

import { signup } from "@redux/reducers/user-reducer/userThunks";
import useForm from "@hooks/useForm";
import LabeledInput from "@components/Input/LabeledInput/LabeledInput";
import Button from "@components/Button";

import styles from "./SignUpPage.module";
import AuthFormTemplate from "../../templates/auth-form-template/AuthFormTemplate";

function Signup({ className }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { onSubmit, register, formData, errors } = useForm();
  const { isLoading, isSuccess } = useSelector(
    (state) => state.user.query.signup
  );
  const disabled =
    Object.keys(errors).some(
      (inputName) => !!errors[inputName] || !formData[inputName]
    ) || isLoading;

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

    dispatch(signup({ email, password, username }));
  };

  useEffect(() => {
    isSuccess && navigate("/login", { replace: true });
  }, [isSuccess, navigate]);

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
