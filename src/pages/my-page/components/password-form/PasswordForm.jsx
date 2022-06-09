import { useDispatch } from "react-redux";

import { updateUserPassword } from "@redux/reducers/user-reducer/userThunks";
import useForm from "@hooks/useForm";
import LabeledInput from "@shared/input/labeled-input/LabeledInput";
import Button from "@shared/button/Button";

function PasswordForm() {
  const dispatch = useDispatch();
  const { onSubmit, register, formData, errors } = useForm();
  const disabled = Object.keys(errors).some(
    (inputName) => !!errors[inputName] || !formData[inputName]
  );

  const handleSubmit = async (formData) => {
    const { oldPassword, newPassword } = formData;

    dispatch(updateUserPassword({ oldPassword, newPassword }));
  };

  const validateConfirmNewPassword = (value) => {
    if (formData.newPassword !== value) {
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
    <form onSubmit={onSubmit(handleSubmit)}>
      <LabeledInput
        label="기존 비밀번호"
        className="mb-30"
        id="old-password"
        type="password"
        feedback={errors.oldPassword}
        placeholder="기존 비밀번호를 입력해주세요"
        {...register("oldPassword")}
      />
      <LabeledInput
        label="새 비밀번호"
        className="mb-30"
        id="new-password"
        type="password"
        placeholder="새 비밀번호를 입력해주세요"
        feedback={errors.newPassword}
        {...register("newPassword", {
          pattern: {
            value: /^.*(?=^.{8,12}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/,
            message: "영문,숫자,특수문자의 조합으로 8 ~ 12글자를 입력해 주세요",
          },
        })}
      />
      <LabeledInput
        label="새 비밀번호 확인"
        className="mb-30"
        id="confirm-new-password"
        type="password"
        placeholder="새 비밀번호를 입력해주세요"
        feedback={errors.confirmNewPassword}
        {...register("confirmNewPassword", {
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
        비밀번호 수정
      </Button>
    </form>
  );
}

export default PasswordForm;
