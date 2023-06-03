import titleLogo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { Container } from "../../style/style";
import {
  NavBar,
  HeaderContent,
  LogoImage,
  LogoWrapper,
  HeaderWrapper,
  LoginButton,
} from "./Header.style";
import { useRecoilValue } from "recoil";
import ServerSelectBox from "../ServerSelectBox";
import { modalRepository } from "../../app/recoil/modalAtoms.tsx";
import Login from "../Login";
import { userState } from "../../app/recoil/userAtom.tsx";
import PersonalDropdown from "../PersonalDropdown";

function Header() {
  const navigate = useNavigate();
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
