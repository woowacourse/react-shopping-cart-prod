import styled from "@emotion/styled";

const StyledLogoLink = styled.h1`
  .logo-link {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    color: ${({ theme: { colors } }) => colors.white};
    font-size: ${({ theme: { fontSize } }) => fontSize.xl};
    font-weight: 900;
    margin-left: 20px;
    line-height: 70px;
  }
`;

export default StyledLogoLink;
