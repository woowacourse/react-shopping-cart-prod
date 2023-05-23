import titleLogo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { Container } from "../../style/style";
import {
  CartCount,
  CartCountWrapper,
  CartTitle,
  CartWrapper,
  HeaderWrapper,
  LogoImage,
  LogoWrapper,
  Navbar,
} from "./Header.style";
import { useRecoilValue } from "recoil";
import { cartCountSelector } from "../../recoil/cartAtoms";
import ServerSelectBox from "../ServerSelectBox/ServerSelectBox.tsx";
import { serverState } from "../../recoil/serverAtom.ts";

function Header() {
  const navigate = useNavigate();
  const cartCount = useRecoilValue(cartCountSelector);
  const server = useRecoilValue(serverState);

  return (
    <Navbar>
      <Container>
        <HeaderWrapper>
          <LogoWrapper onClick={() => navigate("/")}>
            <LogoImage src={titleLogo} />
          </LogoWrapper>
          <CartWrapper>
            <div style={{ color: 'black' }}>현재 상태 : {server}</div>
            <ServerSelectBox />
            <div
              style={{ display: 'flex', gap: '10px' }}
              onClick={() => navigate("/cart")}
            >
              <CartTitle>장바구니</CartTitle>
              <CartCountWrapper>
                <CartCount>{cartCount}</CartCount>
              </CartCountWrapper>
            </div>
          </CartWrapper>
        </HeaderWrapper>
      </Container>
    </Navbar>
  );
}

export default Header;
