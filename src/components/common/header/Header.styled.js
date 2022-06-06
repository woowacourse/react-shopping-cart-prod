import styled from "@emotion/styled";

const StyledHeader = styled.header`
  background-color: ${({ theme: {colors} }) => colors.mint};

  position: sticky;
  z-index: 5;
  top: 0;
  right: 0;
  left: 0;

  .logo-link {
    flex-shrink: 0;
    width: 300px;
  }
`;

export default StyledHeader;
