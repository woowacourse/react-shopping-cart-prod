import styled from "styled-components";

export const LoginPageContainer = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  gap: 12px;
`;

export const LoginButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;

  padding-top: 32px;

  border-top: 1px solid ${({ theme: { color } }) => color.gray03};
`;
