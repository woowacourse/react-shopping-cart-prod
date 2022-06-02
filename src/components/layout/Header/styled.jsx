import styled from "styled-components";

export const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;

  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 3;

  width: 100vw;
  height: 80px;
  padding: 0 20px;
  background-color: ${({ theme: { color } }) => color.point};
  box-shadow: 0 4px 10px 2px ${({ theme: { color } }) => color.gray02};
`;

export const NavButtonContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 450px;
`;

export const UserInfoButton = styled.div`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background-color: white;
  color: ${({ theme: { color } }) => color.point};
  line-height: 40px;
`;
