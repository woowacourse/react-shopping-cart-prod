import { ChangeEvent, Suspense, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import cartState from '@recoil/cart/cartState';
import { useServer } from '@hooks/recoil/server/useServer';
import CartStepperWithIcon from '@components/cart/CartStepperWithIcon';
import SelectBox from '@components/common/SelectBox';
import Logo from '@components/layout/Logo';
import { getCart } from '@utils/cart/fetchCart';
import { SERVER_NAME } from '@constants/serverUrlConstants';
import { Container } from '@styles/style';
import * as S from './Header.style';

function Header() {
  const { server, handleServer } = useServer();
  const setCart = useSetRecoilState(cartState);

  const onChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.currentTarget;

    const result = SERVER_NAME.filter((item) => item === value)[0];

    handleServer(result);
  };

  useEffect(() => {
    const fetchCartData = async () => {
      const cartData = await getCart(server);
      setCart(cartData);
    };

    fetchCartData();
  }, [server, setCart]);

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
