import styled from "styled-components";

export const UserInfoPageContainer = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  gap: 12px;
`;

export const UserInfoInputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 620px;
  align-items: center;
`;

export const UserInfoButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;

  margin-top: 64px;
`;

export const UserInfoLabel = styled.label`
  margin-bottom: 22px;

  color: ${({ theme: { color } }) => color.gray01};
  font-weight: 700;
`;

export const DeleteAccountButton = styled.button`
  font-size: ${({ theme: { fontSize } }) => fontSize.small};
  background-color: transparent;
  border: none;
  border-bottom: 1px solid ${({ theme: { color } }) => color.gray02};
  color: ${({ theme: { color } }) => color.gray02};
  cursor: pointer;

  &:hover {
    color: ${({ theme: { color } }) => color.gray01};
    border-bottom: 1px solid ${({ theme: { color } }) => color.gray01};
  }
`;
