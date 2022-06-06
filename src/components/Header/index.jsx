import { css } from "@emotion/react";

import StyledHeader from "@/components/Header/index.styled";
import HeaderWrapper from "@/components/Wrapper/index.styled";
import LogoLink from "@/components/Header/Logo";
import Menu from "@/components/Header/Menu";

function Header() {
  return (
    <StyledHeader>
      <HeaderWrapper css={innerHeaderStyle}>
        <LogoLink />
        <Menu />
      </HeaderWrapper>
    </StyledHeader>
  );
}

const innerHeaderStyle = css`
  display: flex;
  justify-content: space-between;
`;

export default Header;
