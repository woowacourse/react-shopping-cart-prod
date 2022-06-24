import { useDispatch } from "react-redux";

import { updateUserPassword } from "@redux/reducers/user/userThunks";
import LabeledInput from "@components/Input/LabeledInput/LabeledInput";
import Button from "@components/Button";
import useInput from "@hooks/useInput";
import { passwordValidator, confirmPasswordValidator } from "@utils/validators";

function PasswordForm() {
  const dispatch = useDispatch();

  const {
    state: oldPassword,
    handleChange: handleChangeOldPassword,
    validation: oldPasswordValidation,
  } = useInput("");

  const {
    state: newPassword,
    handleChange: handleChangeNewPassword,
    validation: newPasswordValidation,
  } = useInput("", passwordValidator);

  const {
    state: confirmNewPassword,
    handleChange: handleChangeConfirmNewPassword,
    validation: confirmNewPasswordValidation,
  } = useInput("", confirmPasswordValidator(newPassword));

  const disabled =
    !oldPasswordValidation.isValid ||
    !newPasswordValidation.isValid ||
    !confirmNewPasswordValidation.isValid;

  const handleSubmitChangePasswordForm = () => {
    dispatch(updateUserPassword({ oldPassword, newPassword }));
  };

  return (
    <form onSubmit={handleSubmitChangePasswordForm}>
      <LabeledInput
        label="기존 비밀번호"
        className="mb-40"
        id="old-password"
        type="password"
        placeholder="기존 비밀번호를 입력해주세요"
        value={oldPassword}
        onChange={(e) => handleChangeOldPassword(e.target.value)}
      />
      <LabeledInput
        label="새 비밀번호"
        className="mb-40"
        id="new-password"
        type="password"
        placeholder="새 비밀번호를 입력해주세요"
        value={newPassword}
        feedback={newPasswordValidation.errorMessage}
        onChange={(e) => handleChangeNewPassword(e.target.value)}
      />
      <LabeledInput
        label="새 비밀번호 확인"
        className="mb-40"
        id="confirm-new-password"
        type="password"
        placeholder="새 비밀번호를 입력해주세요"
        value={confirmNewPassword}
        feedback={confirmNewPasswordValidation.errorMessage}
        onChange={(e) => handleChangeConfirmNewPassword(e.target.value)}
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
