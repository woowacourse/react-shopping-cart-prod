import { Link } from "react-router-dom";

import StyledDropdownContainer from "@/components/Dropdown/index.styled";

export default function Dropdown({ onClick }) {
  return (
    <StyledDropdownContainer>
      <div className="baedali" />
      <div className="dropdown-container">
        <div className="dropdown-content">
          <Link to="edit">회원정보 수정</Link>
          <a onClick={onClick}>로그아웃</a>
        </div>
      </div>
    </StyledDropdownContainer>
  );
}
