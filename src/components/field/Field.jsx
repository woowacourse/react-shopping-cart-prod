import React from "react";

import StyledField from "./Field.styled";
import Input from "@/components/input/Input";

const error_messages = {
  이메일형식아님: "이메일 주소를 입력해주세요",
  잘못된길이: "올바르지 않은 길이입니다",
  비밀번호규칙: "영문, 숫자를 포함하여 8-20자로 입력하세요",
  불일치: "비밀번호가 일치하지 않습니다",
};

function Field({
  labelName,
  type,
  placeholder,
  minLength,
  maxLength,
  errorMessage,
  value,
  required,
  disabled,
  onChange,
}) {
  return (
    <StyledField>
      <div className="field__header">
        <label>{labelName}</label>
        <div className="error__message">
          {errorMessage !== "none" && error_messages[errorMessage]}
        </div>
      </div>
      <Input
        type={type}
        placeholder={placeholder}
        minLength={minLength}
        maxLength={maxLength}
        value={value}
        required={required}
        disabled={disabled}
        onChange={onChange}
      />
    </StyledField>
  );
}

export default Field;
