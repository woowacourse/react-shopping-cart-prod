import React from "react";
import StyledDropdownContainer from "@/components/dropdown/Dropdown.styled";

export default function Dropdown() {
  return (
    <StyledDropdownContainer>
      <div className="baedali"></div>
      <div className="dropdown-container">
        <div className="dropdown-content">
          <a href="#">회원정보 수정</a>
          <a href="#">로그아웃</a>
        </div>
      </div>
    </StyledDropdownContainer>
  );
}
