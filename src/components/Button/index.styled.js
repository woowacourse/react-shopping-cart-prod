import styled from "@emotion/styled";

const StyledButton = styled.button`
  &:disabled {
    background-color: ${({ theme }) => theme.colors.gray_500};
    cursor: initial;
  }
`;

export default StyledButton;
