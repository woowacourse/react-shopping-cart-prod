import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Button from "@/components/Button";
import Field from "@/components/Field";
import Form from "@/components/Form";
import {
  INPUT_TYPE,
  MESSAGE,
  NICKNAME,
  PASSWORD,
  PATH,
  STATUS,
} from "@/constants";
import useFetch from "@/hooks/useFetch";
import useInput from "@/hooks/useInput";
import usePasswordConfirm from "@/hooks/usePasswordConfirm";
import StyledUserEditContainer from "@/pages/UserEdit/index.style";
import { editUser, getUserInfo, logoutUser } from "@/redux/modules/user";

function UserEdit() {
  const { email: prevEmail } = useSelector((state) => state.userState);
  const { nickname: prevNickname } = useSelector((state) => state.userState);
  const { authorized } = useSelector((state) => state.userState);

  const [nickname, onChangeNickname, setNickname] = useInput(
    INPUT_TYPE.NICKNAME,
    STATUS.FULFILLED
  );
  const [password, onChangePassword] = useInput(
    INPUT_TYPE.PASSWORD,
    STATUS.READY
  );
  const [passwordConfirm, onChangePasswordConfirm] = usePasswordConfirm();
  const [preventFormSubmit, setPreventFormSubmit] = useState(true);
  const { success: editSuccess, getData: editUserData } = useFetch(
    "put",
    "users/me",
    editUser
  );
  const { success: withdrawSuccess, getData: withdrawUser } = useFetch(
    "delete",
    "users/me",
    logoutUser
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    editUserData({
      nickname: nickname.value,
      password: password.value,
    });
  };

  const handleWithdrawalClick = async () => {
    if (confirm(MESSAGE.WITHDRAWAL_CONFIRM)) {
      withdrawUser();
    }
  };

  useEffect(() => {
    if (!authorized) {
      navigate(PATH.HOME);
      return;
    }

    dispatch(getUserInfo());
  }, [authorized]);

  useEffect(() => {
    setNickname((prev) => ({ ...prev, value: prevNickname }));
  }, [prevNickname]);

  useEffect(() => {
    if (
      nickname.status === STATUS.FULFILLED &&
      password.status === STATUS.FULFILLED &&
      passwordConfirm.status === STATUS.FULFILLED
    ) {
      setPreventFormSubmit(false);
      return;
    }
    setPreventFormSubmit(true);
  }, [nickname, password, passwordConfirm]);

  useEffect(() => {
    if (editSuccess || withdrawSuccess) {
      navigate(PATH.HOME);
    }
  }, [editSuccess, withdrawSuccess]);

  return (
    <StyledUserEditContainer>
      <h2>회원정보 수정</h2>
      <Form
        buttonText="확인"
        onSubmit={handleEditSubmit}
        preventFormSubmit={preventFormSubmit}
      >
        <Field
          labelName="아이디"
          type="email"
          placeholder={prevEmail}
          disabled
        />
        <Field
          labelName="닉네임"
          type="text"
          value={nickname.value}
          minLength={NICKNAME.MIN_LENGTH}
          maxLength={NICKNAME.MAX_LENGTH}
          onChange={onChangeNickname}
          errorMessage={nickname.status}
        />
        <Field
          labelName="비밀번호"
          type="password"
          minLength={PASSWORD.MIN_LENGTH}
          maxLength={PASSWORD.MAX_LENGTH}
          onChange={onChangePassword}
          errorMessage={password.status}
        />
        <Field
          labelName="비밀번호 확인"
          type="password"
          minLength={PASSWORD.MIN_LENGTH}
          maxLength={PASSWORD.MAX_LENGTH}
          onChange={(e) => {
            onChangePasswordConfirm(e, password.value);
          }}
          errorMessage={passwordConfirm.status}
        />
      </Form>
      <Button onClick={handleWithdrawalClick}>회원탈퇴</Button>
    </StyledUserEditContainer>
  );
}

export default UserEdit;
