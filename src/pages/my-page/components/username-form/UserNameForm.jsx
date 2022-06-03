import useForm from "@hooks/useForm/useForm";
import LabeledInput from "@shared/input/labeled-input/LabeledInput";
import createAction from "@redux/createAction";
import { useDispatch, useSelector } from "react-redux";
import ACTION_TYPE from "@redux/actions";
import Button from "@shared/button/Button";
import updateUsername from "../../../../remote/userName";

function UserNameForm() {
  const { onSubmit, register, formData, errors } = useForm();
  const username = useSelector((state) => state.user.username);
  const dispatch = useDispatch();

  const disabled = Object.keys(errors).some(
    (inputName) => !!errors[inputName] || !formData[inputName]
  );

  const handleSubmit = async (formData) => {
    const { username } = formData;
    const newUserInfo = await updateUsername(username);
    dispatch(createAction(ACTION_TYPE.UPDATE_USER, newUserInfo));
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
