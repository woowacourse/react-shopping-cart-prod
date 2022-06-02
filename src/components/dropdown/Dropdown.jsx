import React from "react";
import { Link } from "react-router-dom";

import { deleteCookie } from "@/utils/auth";

import StyledDropdownContainer from "@/components/dropdown/Dropdown.styled";

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
          <Link to="edit">회원정보 수정</Link>
          <a onClick={handleLogoutClick}>로그아웃</a>
        </div>
      </div>
    </StyledDropdownContainer>
  );
}
