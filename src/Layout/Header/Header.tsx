import { Container } from '@styles/style';
import * as S from './Header.style';
import { ChangeEvent, Suspense } from 'react';
import Logo from '@layout/Logo/Logo';
import { CartStepperWithIcon } from '@views/CartItem/components/CartStepperWithIcon';
import { SelectBox } from '@common/SelectBox';
import { SERVER, SERVER_NAME, useServer } from '@recoil/server/serverState';

function Header() {
  const { server, handleServer } = useServer();

  const onChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.currentTarget;

    const result = SERVER_NAME.filter((item) => item === value)[0];

    handleServer(result);
  };

  return (
    <S.Navbar>
      <Container>
        <S.HeaderWrapper>
          <Logo />
          <SelectBox
            options={[
              { value: '마코', name: '마코' },
              { value: '우가', name: '우가' },
              { value: '허브', name: '허브' },
            ]}
            onChange={onChange}
          />
          <Suspense>
            <CartStepperWithIcon />
          </Suspense>
        </S.HeaderWrapper>
      </Container>
    </S.Navbar>
  );
}

export default Header;
