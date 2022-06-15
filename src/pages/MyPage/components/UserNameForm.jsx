import { useDispatch, useSelector } from "react-redux";

import { updateUserGeneralInfo } from "@redux/reducers/user-reducer/userThunks";
import useForm from "@hooks/useForm";

import LabeledInput from "@components/Input/LabeledInput/LabeledInput";
import Button from "@components/Button";

function UserNameForm() {
  const dispatch = useDispatch();
  const { onSubmit, register, formData, errors } = useForm();
  const { isLoading, username } = useSelector((state) => ({
    ...state.user.query.updateUserGeneralInfo,
    username: state.user.data.username,
  }));

  const disabled =
    Object.keys(errors).some(
      (inputName) => !!errors[inputName] || !formData[inputName]
    ) || isLoading;

  const handleSubmit = async (formData) => {
    const { username } = formData;
    dispatch(updateUserGeneralInfo({ username }));
  };

  return (
    <form onSubmit={onSubmit(handleSubmit)}>
      <LabeledInput
        label="이름"
        className="mb-30"
        id="username"
        type="username"
        placeholder="이름을 입력해주세요"
        feedback={errors.username}
        defaultValue={username}
        {...register("username", {
          pattern: {
            value: /^.{1,10}$/,
            message: "이름은 1 ~ 10자 이내로 입력해 주세요",
          },
        })}
      />
      <Button
        variant="primary"
        size="md"
        block
        type="submit"
        disabled={disabled}
      >
        이름 수정
      </Button>
    </form>
  );
}

export default UserNameForm;
