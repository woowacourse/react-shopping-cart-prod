import { useDispatch } from "react-redux";

import { secession } from "@redux/reducers/user-reducer/userThunks";
import useForm from "@hooks/useForm";

import LabeledInput from "@components/Input/LabeledInput/LabeledInput";
import Button from "@components/Button";

function SecessionForm() {
  const dispatch = useDispatch();
  const { onSubmit, register, formData, errors } = useForm();

  const disabled = Object.keys(errors).some(
    (inputName) => !!errors[inputName] || !formData[inputName]
  );

  const handleSubmit = async (formData) => {
    const { password } = formData;
    const result = window.confirm("정말 탈퇴 하시겠습니까?");
    if (!result) return;

    dispatch(secession({ password }));
  };

  return (
    <form onSubmit={onSubmit(handleSubmit)}>
      <LabeledInput
        label="회원탈퇴"
        className="mb-30"
        id="password-for-secession"
        type="password"
        placeholder="비밀번호를 입력해주세요"
        {...register("password")}
      />
      <Button
        variant="primary"
        size="md"
        block
        type="submit"
        disabled={disabled}
      >
        회원탈퇴
      </Button>
    </form>
  );
}

export default SecessionForm;
