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
import { useState } from "react";

function UserInfoPage() {
  const [isEditable, setIsEditable] = useState(true);

  return (
    <UserInfoPageContainer>
      <PageHeader>{isEditable ? "회원정보 수정" : "회원정보"}</PageHeader>
      <UserForm>
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
            value="헤헤"
            disabled={!isEditable}
          />
        </UserInfoInputContainer>
        {isEditable ? (
          <UserInfoButtonContainer>
            <DefaultButton width="500px">수정확인</DefaultButton>
            <DefaultButton
              width="500px"
              bgColor={theme.color.main}
              textColor={theme.color.point}
            >
              수정취소
            </DefaultButton>
          </UserInfoButtonContainer>
        ) : (
          <UserInfoButtonContainer>
            <DefaultButton width="500px">수정하기</DefaultButton>
            <DeleteAccountButton>탈퇴하기</DeleteAccountButton>
          </UserInfoButtonContainer>
        )}
      </UserForm>
    </UserInfoPageContainer>
  );
}

export default UserInfoPage;
