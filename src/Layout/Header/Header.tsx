import { Container } from '@styles/style';
import * as S from './Header.style';
import { Suspense } from 'react';
import Logo from '@layout/Logo/Logo';
import { CartStepperWithIcon } from '@views/CartItem/components/CartStepperWithIcon';

function Header() {
  return (
    <S.Navbar>
      <Container>
        <S.HeaderWrapper>
          <Logo />
          <Suspense>
            <CartStepperWithIcon />
          </Suspense>
        </S.HeaderWrapper>
      </Container>
    </S.Navbar>
  );
}

export default Header;
