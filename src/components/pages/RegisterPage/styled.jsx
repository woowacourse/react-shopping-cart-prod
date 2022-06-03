import styled from "styled-components";

export const RegisterPageContainer = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  gap: 12px;
`;

export const RegisterInputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 620px;
  align-items: center;
`;

export const RegisterButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;

export const RegisterLabel = styled.label`
  margin-bottom: 22px;

  color: ${({ theme: { color } }) => color.gray01};
  font-weight: 700;
`;
