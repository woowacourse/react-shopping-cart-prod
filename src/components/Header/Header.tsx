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
} from "./Header.style";
import { useRecoilValue } from "recoil";
import { cartCountSelector } from "../../recoil/cartAtoms";
import ServerSelectBox from "../ServerSelectBox";
import { modalRepository } from "../../recoil/modalAtoms.tsx";
import Icon from "../Icon.tsx";
import Login from "../Login";
import { userRepository, userState } from "../../recoil/userAtom.ts";

function Header() {
  const navigate = useNavigate();
  const cartCount = useRecoilValue(cartCountSelector);
  const user = useRecoilValue(userState);
  const { openModal } = useRecoilValue(modalRepository);
  const { logout } = useRecoilValue(userRepository);

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
                {
                  cartCount > 0
                    ? (
                      <CartCountWrapper>
                        <CartCount>
                          <CartCountText>{cartCount}</CartCountText>
                        </CartCount>
                      </CartCountWrapper>
                    ) : (
                      <Icon fontSize={30}>
                        <IoCart />
                      </Icon>
                    )
                }
                <MenuTitle>장바구니</MenuTitle>
              </MenuIcon>
            </MenuWrapper>
            <MenuWrapper onClick={() => navigate("/order")}>
              <MenuIcon>
                <Icon fontSize={30}>
                  <IoList />
                </Icon>
                <MenuTitle>주문목록</MenuTitle>
              </MenuIcon>
            </MenuWrapper>
            {
              user ? (
                <MenuWrapper onClick={() => logout()}>
                  <MenuIcon>
                    <Icon fontSize={30}>
                      <IoPerson />
                    </Icon>
                    <MenuTitle>로그아웃</MenuTitle>
                  </MenuIcon>
                </MenuWrapper>
              ) : (
                <MenuWrapper onClick={() => openModal(<Login />)}>
                  <MenuIcon>
                    <Icon fontSize={30}>
                      <IoPerson />
                    </Icon>
                    <MenuTitle>로그인</MenuTitle>
                  </MenuIcon>
                </MenuWrapper>
              )
            }
          </NavBar>
        </HeaderContent>
      </Container>
    </HeaderWrapper >
  );
}

export default Header;
