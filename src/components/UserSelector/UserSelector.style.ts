import styled from 'styled-components';

export const Wrapper = styled.div`
  width: fit-content;
  display: flex;
  position: relative;
`;

export const UserProfileButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
`;

export const Menu = styled.div<{ isOpen: boolean }>`
  position: absolute;
  right: 0px;
  top: 40px;
  width: 200px;
  margin-top: 4px;
  padding: 8px;
  background: #f2f4f6;
  border-radius: 16px;
  transition: 0.3s;
  visibility: ${(props) => (props.isOpen ? 'visible' : 'hidden')};
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  box-shadow: 0 10px 16px 0 rgba(0, 0, 0, 0.2);
  z-index: 999;
`;

export const UserInfoWrapper = styled.div`
  border-bottom: 1px solid gainsboro;
  padding: 16px 12px;
  background-color: #fff;
  border-radius: 16px 16px 0 0;
`;

export const UserInfoName = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.color.dark};
`;

export const UserInfoId = styled.div`
  font-size: 14px;
  color: #666;
`;

export const UserInfoPoint = styled.div`
  margin-top: 8px;
  font-size: 16px;
  color: ${({ theme }) => theme.color.dark};
`;

export const UserListWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 0 0 16px 16px;
`;

export const User = styled.li`
  cursor: pointer;
  padding: 12px 12px;

  &:hover {
    background-color: aliceblue;
  }
  &:hover > * {
    color: ${({ theme }) => theme.color.info};
  }
`;

export const UserListTitle = styled.div`
  padding: 12px 12px 0 12px;
  font-size: 8px;
  color: #00a3f9;
  font-weight: 800;
`;
