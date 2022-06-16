import styled from "@emotion/styled";

const StyledErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 90vh;
`;

const StyledErrorMessage = styled.div`
  font-size: ${({ theme }) => theme.fontSize.m};
`;

export { StyledErrorContainer, StyledErrorMessage };
