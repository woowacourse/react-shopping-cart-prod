import React from "react";

import StyledUserEditContainer from "@/pages/user-edit/UserEdit.style";

import Form from "@/components/form/Form";
import Field from "@/components/field/Field";

import { Link } from "react-router-dom";

function UserEdit() {
  return (
    <StyledUserEditContainer>
      <h2>회원정보 수정</h2>
      <Form buttonText="확인">
        <Field
          labelName="아이디"
          type="email"
          placeholder="woowa@gmail.com"
          disabled
        />
        <Field labelName="닉네임" type="text" placeholder="민초도리" />
        <Field labelName="비밀번호" type="password" />
        <Field labelName="비밀번호 확인" type="password" />
      </Form>
      <div className="withdrawal">
        <Link to="/">회원탈퇴</Link>
      </div>
    </StyledUserEditContainer>
  );
}

export default UserEdit;
