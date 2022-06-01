import { useState } from "react";

import { theme } from "style";

import DefaultButton from "components/common/Button/DefaultButton";
import PageHeader from "components/common/PageHeader";
import UserForm from "components/common/UserForm";
import UserInput from "components/common/UserInput";
import {
  DeleteAccountButton,
  UserInfoButtonContainer,
  UserInfoInputContainer,
  UserInfoLabel,
  UserInfoPageContainer,
} from "./styled";
import Modal from "./Modal";
import { checkNickName } from "validator";
import { RANGE } from "constants";

function UserInfoPage() {
  const [isEditable, setIsEditable] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [nickname, setNickname] = useState("태태");
  const [errorMessage, setErrorMessage] = useState("");

  const closeModal = () => {
    setIsOpenModal(false);
  };

  const deleteAccount = () => {
    /* TODO: 계정 삭제 API 요청 후 토큰 삭제 후 리디렉트 */
  };

  const handleNicknameChange = ({ target: { value } }) => {
    try {
      checkNickName(value);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(error.message);
    }
    setNickname(value);
  };

  const handleCancleEdit = () => {
    setNickname("태태"); // TODO: store에 있는 닉네임 초기값으로 다시 복귀
    setIsEditable(false);
  };

  const changeNickname = (e) => {
    e.preventDefault();
    // TODO: 서버 요청 성공하면 아래 코드 실행
    setIsEditable(false);
  };

  return (
    <UserInfoPageContainer>
      <PageHeader>{isEditable ? "회원정보 수정" : "회원정보"}</PageHeader>
      <UserForm onSubmit={changeNickname}>
        <UserInfoInputContainer>
          <UserInfoLabel>이메일</UserInfoLabel>
          <UserInput
            width="500px"
            placeholder="이메일을 입력해주세요"
            value="a@naver.com"
            disabled
          />
        </UserInfoInputContainer>
        <UserInfoInputContainer>
          <UserInfoLabel>닉네임</UserInfoLabel>
          <UserInput
            width="500px"
            placeholder="닉네임을 입력해주세요"
            value={nickname}
            onChange={handleNicknameChange}
            disabled={!isEditable}
            minLength={RANGE.NICKNAME_MIN_LENGTH}
            maxLength={RANGE.NICKNAME_MAX_LENGTH}
            errorMessage={errorMessage}
          />
        </UserInfoInputContainer>
        {isEditable ? (
          <UserInfoButtonContainer>
            <DefaultButton key="confirmEdit" type="submit" width="500px">
              수정확인
            </DefaultButton>
            <DefaultButton
              type="button"
              width="500px"
              bgColor={theme.color.main}
              textColor={theme.color.point}
              onClick={handleCancleEdit}
            >
              수정취소
            </DefaultButton>
          </UserInfoButtonContainer>
        ) : (
          <UserInfoButtonContainer>
            <DefaultButton
              key="edit"
              width="500px"
              type="button"
              onClick={(e) => {
                setIsEditable(true);
                e.stopPropagation();
              }}
            >
              수정하기
            </DefaultButton>
            <DeleteAccountButton
              type="button"
              onClick={() => {
                setIsOpenModal(true);
              }}
            >
              탈퇴하기
            </DeleteAccountButton>
          </UserInfoButtonContainer>
        )}
      </UserForm>
      {isOpenModal && <Modal onClose={closeModal} onConfirm={deleteAccount} />}
    </UserInfoPageContainer>
  );
}

export default UserInfoPage;
