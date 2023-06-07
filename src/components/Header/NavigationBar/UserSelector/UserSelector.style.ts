import styled from 'styled-components';

export const Wrapper = styled.div`
  width: fit-content;
  display: flex;
  position: relative;
`;

export const UserProfileButton = styled.button`
  width: 44px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 8px;
  font-weight: 500;
  gap: 2px;
  cursor: pointer;
`;

export const UserProfileImage = styled.img`
  width: 26px;
  height: 26px;
  border-radius: 50%;
  overflow: hidden;
`;

export const Menu = styled.div<{ isOpen: boolean }>`
  position: absolute;
  right: 0px;
  top: 40px;
  width: 224px;
  margin-top: 4px;
  padding: 8px;
  background: ${({ theme }) => theme.color.gray300};
  border-radius: 16px;
  transition: 0.3s;
  visibility: ${(props) => (props.isOpen ? 'visible' : 'hidden')};
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  box-shadow: 0 10px 16px 0 rgba(0, 0, 0, 0.2);
  z-index: ${({ theme }) => theme.zIndex.userSelector};
`;

export const UserInfoWrapper = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.color.gray200};
  padding: 16px 12px;
  background-color: ${({ theme }) => theme.color.white};
  border-radius: 16px 16px 0 0;
`;

export const UserInfoName = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.color.black};
`;

export const UserInfoId = styled.div`
  display: -webkit-box;
  text-overflow: ellipsis;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-size: 14px;
  color: ${({ theme }) => theme.color.gray500};
`;

export const UserInfoPoint = styled.div`
  margin-top: 8px;
  font-size: 16px;
  color: ${({ theme }) => theme.color.black};
`;

export const UserListWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.color.white};
  border-radius: 0 0 16px 16px;
`;

export const User = styled.li`
  cursor: pointer;
  padding: 12px 12px;

  &:hover {
    background-color: aliceblue;
  }
  &:hover > * {
    color: ${({ theme }) => theme.color.green100};
  }
`;

export const UserListTitle = styled.div`
  padding: 12px 12px 0 12px;
  font-size: 8px;
  color: ${({ theme }) => theme.color.blue100};
  font-weight: 700;
`;

export const UserName = styled.div``;
