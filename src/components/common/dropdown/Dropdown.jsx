import React from "react";
import { Link, useNavigate } from "react-router-dom";

import useToken from "@/hooks/useToken";

import StyledDropdownContainer from "@/components/common/dropdown/Dropdown.styled";

export default function Dropdown() {
  const navigate = useNavigate();
  const [_, deleteToken] = useToken();

  const handleLogoutClick = () => {
    deleteToken();
    navigate("/");
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
