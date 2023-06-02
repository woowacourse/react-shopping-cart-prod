import titleLogo from "../../assets/logo.png";
import { IoCart, IoList, IoPerson } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { Container } from "../../style/style";
import {
  CartCountText,
  CartCount,
  MenuTitle,
  NavBar,
  HeaderContent,
  LogoImage,
  LogoWrapper,
  HeaderWrapper,
  MenuWrapper,
  MenuIcon,
  CartCountWrapper,
  LoginButton,
} from "./Header.style";
import { useRecoilValue } from "recoil";
import { cartCountSelector } from "../../recoil/cartAtoms";
import ServerSelectBox from "../ServerSelectBox";
import { modalRepository } from "../../recoil/modalAtoms.tsx";
import Icon from "../Icon.tsx";
import Login from "../Login";
import { userState } from "../../recoil/userAtom.ts";
import PersonalDropdown from "./PersonalDropdown.tsx";

function Header() {
  const navigate = useNavigate();
  const cartCount = useRecoilValue(cartCountSelector);
  const user = useRecoilValue(userState);
  const { openModal } = useRecoilValue(modalRepository);

  return (
    <HeaderWrapper>
      <Container>
        <HeaderContent>
          <LogoWrapper onClick={() => navigate("/")}>
            <LogoImage src={titleLogo} />
          </LogoWrapper>
          <NavBar>
            <ServerSelectBox />
            <MenuWrapper onClick={() => navigate("/cart")}>
              <MenuIcon>
                {cartCount > 0 ? (
                  <CartCountWrapper>
                    <CartCount>
                      <CartCountText>{cartCount}</CartCountText>
                    </CartCount>
                  </CartCountWrapper>
                ) : (
                  <Icon fontSize={30}>
                    <IoCart />
                  </Icon>
                )}
                <MenuTitle>장바구니</MenuTitle>
              </MenuIcon>
            </MenuWrapper>
            {user ? (
              <PersonalDropdown />
            ) : (
              <LoginButton onClick={() => openModal(<Login />)}>
                로그인
              </LoginButton>
            )}
          </NavBar>
        </HeaderContent>
      </Container>
    </HeaderWrapper>
  );
}

export default Header;
