import bigTitleLogo from '../../assets/logo.png';
import smallTitleLogo from '../../assets/small-logo.png';
import { useNavigate } from 'react-router-dom';
import { Container } from '../../style/style';
import { PAGE_PATH } from '../../constants/index.ts';
import NavigationBar from './NavigationBar/NavigationBar.tsx';
import * as S from './Header.style';
import { Suspense } from 'react';
import HeaderSkeleton from './NavigationBar/HeaderSkeleton.tsx';

function Header() {
  const navigate = useNavigate();

  return (
    <S.HeaderWrapper>
      <Container>
        <S.HeaderContent>
          <S.LogoWrapper onClick={() => navigate(PAGE_PATH.HOME)}>
            <S.BigLogoImage src={bigTitleLogo} />
            <S.SmallLogoImage src={smallTitleLogo} />
          </S.LogoWrapper>
          <Suspense fallback={<HeaderSkeleton />}>
            <NavigationBar />
          </Suspense>
        </S.HeaderContent>
      </Container>
    </S.HeaderWrapper>
  );
}

export default Header;
