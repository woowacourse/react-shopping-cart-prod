import styled from "@emotion/styled";

const StyledInput = styled.input`
  width: 100%;
  height: 35px;
  border: 1px solid ${({ theme }) => theme.colors.gray_500};
  border-radius: 4px;
  padding: 10px;
`;

export default StyledInput;
