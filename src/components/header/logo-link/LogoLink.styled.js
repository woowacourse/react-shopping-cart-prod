import styled from "@emotion/styled";
import { noneStyles } from "@/styles/styleUtil";

const StyledLogoLink = styled.h1`
  .logo-link {
    ${noneStyles.a}
    display: flex;
    align-items: center;
    justify-content: flex-start;
    color: ${({ theme }) => theme.colors.white};
    font-size: ${({ theme }) => theme.fontSize.xl};
    font-weight: 900;
    margin-left: 20px;
    line-height: 70px;
  }
`;

export default StyledLogoLink;
