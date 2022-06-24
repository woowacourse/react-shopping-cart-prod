import { useDispatch, useSelector } from "react-redux";

import { updateUserGeneralInfo } from "@redux/reducers/user/userThunks";

import LabeledInput from "@components/Input/LabeledInput/LabeledInput";
import Button from "@components/Button";
import useInput from "@hooks/useInput";
import { usernameValidator } from "@utils/validators";

function UserNameForm() {
  const dispatch = useDispatch();

  const { isLoading, username } = useSelector((state) => ({
    ...state.userReducer.query.updateUserGeneralInfo,
    username: state.userReducer.data.username,
  }));

  const {
    state: newUsername,
    handleChange: handleChangeNewUsername,
    validation: newUsernameValidation,
  } = useInput(username, usernameValidator);

  const handleSubmitChangeUsernameForm = () => {
    dispatch(updateUserGeneralInfo({ username: newUsername }));
  };

  return (
    <form onSubmit={handleSubmitChangeUsernameForm}>
      <LabeledInput
        label="이름"
        className="mb-40"
        id="username"
        type="username"
        placeholder="이름을 입력해주세요"
        value={newUsername}
        feedback={newUsernameValidation.errorMessage}
        onChange={(e) => handleChangeNewUsername(e.target.value)}
      />
      <Button
        variant="primary"
        size="md"
        block
        type="submit"
        disabled={!newUsernameValidation.isValid}
      >
        이름 수정
      </Button>
    </form>
  );
}

export default UserNameForm;
