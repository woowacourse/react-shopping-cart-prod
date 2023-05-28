import { ChangeEvent, Suspense } from 'react';
import { useServer } from '@recoil/server/serverState';
import { CartStepperWithIcon } from '@components/cart/CartStepperWithIcon';
import { SelectBox } from '@components/common/SelectBox';
import Logo from '@components/layout/Logo/Logo';
import { SERVER_NAME } from '@constants/urlConstants';
import { Container } from '@styles/style';
import * as S from './Header.style';

function Header() {
  const { handleServer } = useServer();

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
