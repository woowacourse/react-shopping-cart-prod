import titleLogo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { Container } from "../../style/style";
import {
  CartCount,
  CartCountWrapper,
  CartTitle,
  NavBar,
  HeaderContent,
  LogoImage,
  LogoWrapper,
  HeaderWrapper,
  CartWrapper,
  SignButton,
} from "./Header.style";
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import { cartCountSelector } from "../../recoil/cartAtoms";
import ServerSelectBox from "../ServerSelectBox";
import { modalContentState, modalOpenState } from "../../recoil/modalAtoms.tsx";

function Header() {
  const navigate = useNavigate();
  const cartCount = useRecoilValue(cartCountSelector);
  const setModalOpen = useSetRecoilState(modalOpenState);
  const setModalContent = useSetRecoilState(modalContentState);
  const openModal = () => {
    setModalOpen(true);
    setModalContent(<>로그인 페이지</>);
  };

  return (
    <HeaderWrapper>
      <Container>
        <HeaderContent>
          <LogoWrapper onClick={() => navigate("/")}>
            <LogoImage src={titleLogo} />
          </LogoWrapper>
          <NavBar>
            <ServerSelectBox />
            <CartWrapper
              onClick={() => navigate("/cart")}
            >
              <CartTitle>장바구니</CartTitle>
              <CartCountWrapper>
                <CartCount>{cartCount}</CartCount>
              </CartCountWrapper>
            </CartWrapper>
            <SignButton onClick={() => openModal()}>로그인</SignButton>
          </NavBar>
        </HeaderContent>
      </Container>
    </HeaderWrapper >
  );
}

export default Header;
