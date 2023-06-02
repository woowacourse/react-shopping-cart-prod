import { useState } from "react";
import styled from "styled-components";
import { MenuIcon, MenuTitle, MenuWrapper } from "./Header.style";
import Icon from "../Icon";
import { IoPerson } from "react-icons/io5";
import { useRecoilValue } from "recoil";
import { userRepository } from "../../recoil/userAtom.ts";
import { useNavigate } from "react-router-dom";

export const DropdownWrapper = styled.div`
  position: relative;
  display: inline-block;
  color: black;
`;

export const DropdownMenu = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: calc(100% + 5px);
  right: 0;
  background-color: #ffffff;
  border: 1px solid #cccccc;
  border-top: none;
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  font-size: 18px;
  z-index: 9999;
`;

export const DropdownMenuItem = styled.div`
  padding: 10px;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background-color: #f2f2f2;
  }
`;

export const Backdrop = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0);
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  z-index: 9998;
`;

function PersonalDropdown() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useRecoilValue(userRepository);

  const options = [
    {
      name: "주문목록",
      callback: () => navigate("order"),
    },
    {
      name: "로그아웃",
      callback: () => logout(),
    },
  ];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClick = (callback: () => void) => {
    callback();
    toggleDropdown();
  };

  return (
    <DropdownWrapper>
      <MenuWrapper onClick={() => toggleDropdown()}>
        <MenuIcon>
          <Icon fontSize={30}>
            <IoPerson />
          </Icon>
          <MenuTitle>#아이디#</MenuTitle>
        </MenuIcon>
      </MenuWrapper>
      <DropdownMenu isOpen={isOpen}>
        {options.map((option, index) => (
          <DropdownMenuItem
            key={index}
            onClick={() => handleClick(option.callback)}
          >
            {option.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenu>
      <Backdrop isOpen={isOpen} onClick={() => toggleDropdown()} />
    </DropdownWrapper>
  );
}

export default PersonalDropdown;
