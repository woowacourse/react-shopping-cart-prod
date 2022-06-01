import React from "react";
import StyledDropdownContainer from "@/components/dropdown/Dropdown.styled";

import { deleteCookie } from "@/utils/auth";

export default function Dropdown() {
  const handleLogoutClick = () => {
    deleteCookie("accessToken");
    location.reload();
  };
  return (
    <StyledDropdownContainer>
      <div className="baedali"></div>
      <div className="dropdown-container">
        <div className="dropdown-content">
          <a href="#">회원정보 수정</a>
          <a onClick={handleLogoutClick}>로그아웃</a>
        </div>
      </div>
    </StyledDropdownContainer>
  );
}
