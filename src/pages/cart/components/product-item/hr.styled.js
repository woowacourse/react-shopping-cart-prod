import styled from "@emotion/styled";

const StyledHr = styled.hr`
  width: 100%;
  border: 1px solid ${({ theme: {colors} }) => colors.gray1};
  margin-top: 10px;
`;

export default StyledHr;
