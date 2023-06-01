import { useState } from 'react';
import styled from 'styled-components';
import { MenuIcon, MenuTitle, MenuWrapper } from './Header.style';
import Icon from '../Icon';
import { IoPerson } from 'react-icons/io5';

const DropdownWrapper = styled.div`
  position: relative;
  display: inline-block;

  color: black;
`;

const DropdownMenu = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: calc(100% + 5px);
  right: 0;
  
  background-color: #ffffff;
  border: 1px solid #cccccc;
  border-top: none;
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
`;

const DropdownMenuItem = styled.div`
  padding: 10px;
  cursor: pointer;

  &:hover {
    background-color: #f2f2f2;
  }
`;

function PersonalDropdown() {
  const options = ['주문목록', '로그아웃'];
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
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
          <DropdownMenuItem key={index}>{option}</DropdownMenuItem>
        ))}
      </DropdownMenu>
    </DropdownWrapper>
  );
}

export default PersonalDropdown;
