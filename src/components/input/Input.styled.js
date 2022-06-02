import styled from "@emotion/styled";

const StyledInput = styled.input`
  width: 100%;
  height: 30px;
  border: 1px solid ${({ theme }) => theme.colors.gray3};
  border-radius: 4px;
`;

export default StyledInput;
