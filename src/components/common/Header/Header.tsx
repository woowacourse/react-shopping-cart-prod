import { ChangeEvent } from 'react';
import { useSetRecoilState } from 'recoil';
import Logo from '../../../assets/png/logo.png';
import { endpointKeyState } from '../../../atoms/endpoint';
import { ENDPOINT } from '../../../constants/auth';
import { PAGE_ROUTES } from '../../../constants/routes';
import AsyncBoundary from '../../AsyncBoundary/AsyncBoundary';
import CartBadge from '../CartBadge/CartBadge';
import Flex from '../Flex';
import * as S from './Header.styles';

const Header = () => {
  const setEndPointKey = useSetRecoilState(endpointKeyState);

  const onChange = ({ target: { value } }: ChangeEvent<HTMLSelectElement>) => {
    setEndPointKey(value as keyof typeof ENDPOINT);
  };

  return (
    <S.Root>
      <Flex width='80%' justify='space-between' align='center'>
        <S.LinkToHome to={PAGE_ROUTES.HOME}>
          <S.Logo src={Logo} alt='shopping cart logo' />
          <S.Title>SHOP</S.Title>
        </S.LinkToHome>
        <select style={{ marginLeft: 'auto' }} onChange={onChange}>
          <option value='말랑'>말랑</option>
          <option value='코코닥'>코코닥</option>
        </select>
        <S.LinkToCart to={PAGE_ROUTES.CART}>
          <Flex align='center'>
            <div>장바구니</div>
            <AsyncBoundary>
              <CartBadge />
            </AsyncBoundary>
          </Flex>
        </S.LinkToCart>
        <S.LinkToCart to={PAGE_ROUTES.ORDER}>
          <Flex align='center'>
            <div>주문 목록</div>
          </Flex>
        </S.LinkToCart>
      </Flex>
    </S.Root>
  );
};

export default Header;
