import useForm from "@hooks/useForm/useForm";
import LabeledInput from "@shared/input/labeled-input/LabeledInput";
import Button from "@shared/button/Button";
import LocalStorage from "../../../../storage/localStorage";
import requestDeleteUser from "../../../../remote/userSecession";

function SecessionForm() {
  const { onSubmit, register, formData, errors } = useForm();

  const disabled = Object.keys(errors).some(
    (inputName) => !!errors[inputName] || !formData[inputName]
  );

  const handleSubmit = async (formData) => {
    const { password } = formData;
    const result = window.confirm("정말 탈퇴 하시겠습니까?");
    if (!result) return;

    const isOK = await requestDeleteUser(password);
    if (!isOK) {
      alert("비밀번호가 일치하지 않습니다");
      return;
    }
    alert("Good Bye!");
    LocalStorage.removeItem("accessToken");
    window.location.href = "/";
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
