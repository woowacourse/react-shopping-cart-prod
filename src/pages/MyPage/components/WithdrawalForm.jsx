import { useDispatch } from "react-redux";

import { secession } from "@redux/reducers/user-reducer/userThunks";

import LabeledInput from "@components/Input/LabeledInput/LabeledInput";
import Button from "@components/Button";
import useInput from "@hooks/useInput";

function WithdrawalForm() {
  const dispatch = useDispatch();

  const { state: password, handleChange: handleChangePassword } = useInput("");

  const handleSubmitWithdrawalForm = () => {
    const result = window.confirm("정말 탈퇴 하시겠습니까?");
    if (!result) return;

    dispatch(secession({ password }));
  };

  return (
    <form onSubmit={handleSubmitWithdrawalForm}>
      <LabeledInput
        label="회원탈퇴"
        className="mb-40"
        id="password-for-secession"
        type="password"
        placeholder="비밀번호를 입력해주세요"
        value={password}
        onChange={(e) => handleChangePassword(e.target.value)}
      />
      <Button variant="primary" size="md" block type="submit">
        회원탈퇴
      </Button>
    </form>
  );
}

export default WithdrawalForm;
