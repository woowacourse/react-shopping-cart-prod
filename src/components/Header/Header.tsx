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
import { useRecoilValue } from "recoil";
import { cartCountSelector } from "../../recoil/cartAtoms";
import ServerSelectBox from "../ServerSelectBox";
import { modalRepository } from "../../recoil/modalAtoms.tsx";

function Header() {
  const navigate = useNavigate();
  const cartCount = useRecoilValue(cartCountSelector);
  const todoRepository = useRecoilValue(modalRepository);
  const { openModal } = todoRepository;

  return (
    <HeaderWrapper>
      <Container>
        <HeaderContent>
          <LogoWrapper onClick={() => navigate("/")}>
            <LogoImage src={titleLogo} />
          </LogoWrapper>
          <NavBar>
            <ServerSelectBox />
            <CartWrapper onClick={() => navigate("/cart")}>
              <CartTitle>장바구니</CartTitle>
              <CartCountWrapper>
                <CartCount>{cartCount}</CartCount>
              </CartCountWrapper>
            </CartWrapper>
            <SignButton onClick={() => navigate("/order")}>주문목록</SignButton>
            <SignButton onClick={() => openModal(<>로그인페이지</>)}>
              로그인
            </SignButton>
          </NavBar>
        </HeaderContent>
      </Container>
    </HeaderWrapper>
  );
}

export default Header;
