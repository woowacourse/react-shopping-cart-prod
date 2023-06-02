import { Container } from '@styles/style';
import * as S from './Header.style';
import { ChangeEvent, Suspense } from 'react';

import { SelectBox } from '@common/SelectBox';

import { CartButtonWithIcon } from '@views/Cart/components/CartButtonWithIcon';
import { useServerUrl } from '@recoil/server/serverUrlState';

import { useResetCart } from '@views/Cart/recoil/cartState';
import { Logo } from '@layout/Logo';
import { isCrewNameType } from '../../types/ServerType';
import { useCredential } from '@recoil/server/credentialState';
import OrderListButton from '@views/Payment/components/OrderListButton/OrderListButton';
import { styled } from 'styled-components';

function Header() {
  const { setServerUrlBy } = useServerUrl();
  const { setCredentialBy } = useCredential();

  const resetCart = useResetCart();

  const handleChangeServer = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value: serverName } = event.currentTarget;

    resetCart();

    if (isCrewNameType(serverName)) {
      setServerUrlBy(serverName);
    }
  };

  const handleChangeUser = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value: userId } = event.currentTarget;

    resetCart();

    setCredentialBy(Number(userId));
  };

  return (
    <S.Navbar>
      <Container>
        <S.HeaderWrapper>
          <Logo />

          <Suspense>
            <IconWrapper style={{ display: 'flex', columnGap: '1.5rem' }}>
              <SelectBox
                options={[
                  { value: '허브', name: '허브' },
                  { value: '마코', name: '마코' },
                  { value: '우가', name: '우가' },
                  { value: 'MSW', name: 'MSW' },
                ]}
                onChange={handleChangeServer}
              />
              <SelectBox
                options={[
                  { value: '1', name: '치즈왕자' },
                  { value: '2', name: '치즈공주' },
                ]}
                onChange={handleChangeUser}
              />
              <OrderListButton />
              <CartButtonWithIcon />
            </IconWrapper>
          </Suspense>
        </S.HeaderWrapper>
      </Container>
    </S.Navbar>
  );
}

export default Header;

const IconWrapper = styled.div`
  display: flex;
  column-gap: 2rem;
`;
