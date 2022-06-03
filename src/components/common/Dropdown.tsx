import React, { PropsWithChildren, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { layer } from '../../styles/layer';

interface DropdownProps {
  closeDropdown: () => void;
}

const Dropdown = ({ children, closeDropdown }: PropsWithChildren<DropdownProps>) => {
  const dropdownRef = useRef<HTMLUListElement>(null);
  const firstRenderRef = useRef(true);

  useEffect(() => {
    window.addEventListener('click', handleCloseDropdown);

    return () => {
      window.removeEventListener('click', handleCloseDropdown);
    };
  }, []);

  const handleCloseDropdown = () => {
    if (!firstRenderRef.current) {
      closeDropdown();
    }
    firstRenderRef.current && (firstRenderRef.current = false);
  };

  return <StyledDropdown ref={dropdownRef}>{children}</StyledDropdown>;
};

export default Dropdown;

const StyledDropdown = styled.ul`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 150px;
  color: black;
  font-size: 16px;
  border-radius: 6px;
  background: white;
  top: 140%;
  overflow: hidden;
  right: 50%;
  z-index: ${layer.dropdown};
  box-shadow: 0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%),
    0px 3px 14px 2px rgb(0 0 0 / 12%);

  & > li {
    cursor: pointer;
    padding: 10px 25px;
    :hover {
      background-color: ${({ theme }) => theme.colors.primary};
      color: white;
    }
  }
`;
