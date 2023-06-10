import titleLogo from "../../assets/logo.png";
import {useNavigate} from "react-router-dom";
import {Container} from "../../style/style";
import {
  NavBar,
  HeaderContent,
  LogoImage,
  LogoWrapper,
  HeaderWrapper,
  LoginButton,
} from "./Header.style";
import {useRecoilValue} from "recoil";
import ServerSelectBox from "../ServerSelectBox";
import Login from "../Login";
import {userState} from "../../app/recoil/user/userAtom.tsx";
import PersonalDropdown from "../PersonalDropdown";
import {modalRepository} from "../../app/recoil/modal/modalRepository.tsx";

function Header() {
  const navigate = useNavigate();
  const user = useRecoilValue(userState);
  const {openModal} = useRecoilValue(modalRepository);

  return (
    <HeaderWrapper>
      <Container>
        <HeaderContent>
          <LogoWrapper onClick={() => navigate("/")}>
            <LogoImage src={titleLogo}/>
          </LogoWrapper>
          <NavBar>
            <ServerSelectBox/>
            {user ? (
              <PersonalDropdown/>
            ) : (
              <LoginButton onClick={() => openModal(<Login/>)}>
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
