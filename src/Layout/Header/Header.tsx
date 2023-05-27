import { Container } from '@styles/style';
import * as S from './Header.style';
import { ChangeEvent, Suspense } from 'react';

import { SelectBox } from '@common/SelectBox';

import { CartStepperWithIcon } from '@views/Cart/components/CartStepperWithIcon';
import { useServerUrl } from '@recoil/server/serverUrlState';

import { useResetCart } from '@views/Cart/recoil/cartState';
import { Logo } from '@layout/Logo';

function Header() {
  const { setServerUrlBy } = useServerUrl();

  const reset = useResetCart();

  const onChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value: crew } = event.currentTarget;

    reset();
    setServerUrlBy(crew);
  };

  return (
    <S.Navbar>
      <Container>
        <S.HeaderWrapper>
          <Logo />
          <SelectBox
            options={[
              { value: '마코', name: '마코' },
              { value: '허브', name: '허브' },
              { value: '우가', name: '우가' },
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
