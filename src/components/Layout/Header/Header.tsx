import { useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import mainLogo from 'assets/main-logo.png';
import cartIcon from 'assets/cart-icon.svg';
import orderList from 'assets/order-list-icon.svg';

import ROUTE_PATH from 'constants/routePath';
import { useRecoilValueLoadable } from 'recoil';
import { cartProductsState } from 'state/cartProducts';
import SelectBox from 'components/@common/SelectBox/SelectBox';
import { ServerOwner } from 'types/serverOwner';
import BASE_URL from 'constants/apiBaseURL';
import { SERVER_OWNER } from 'constants/storeKey';
import store from 'utils/storage';
import Box from 'components/@common/Box';

const serverOwnerOptions = Object.keys(BASE_URL).map((name) => ({ name: name, value: name }));

const Header = () => {
  const loadableCartProducts = useRecoilValueLoadable(cartProductsState);
  const cartProductCount = loadableCartProducts.state === 'loading' ? 0 : loadableCartProducts.contents.size;

  const serverOwner = useMemo(() => store.getStorage<ServerOwner>(SERVER_OWNER) ?? '헙크', []);

  const handleServerOwner = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as ServerOwner;

    store.setStorage(SERVER_OWNER, value);
    window.location.reload();
  }, []);

  return (
    <HeaderContainer>
      <Link to={ROUTE_PATH.ROOT}>
        <MainLogo src={mainLogo} alt="배민상회" />
      </Link>
      <Box flex={{ gap: '8px' }}>
        <SelectBoxContainer sizing={{ width: '46px', height: '50px' }} flex={{ flexDirection: 'column', gap: '4px' }}>
          <Box sizing={{ height: '24px' }}>
            <SelectBox value={serverOwner} options={serverOwnerOptions} onChange={handleServerOwner} />
          </Box>
          <Meaning>서버선택</Meaning>
        </SelectBoxContainer>
        <FlexLink to={ROUTE_PATH.CART}>
          <Icon src={cartIcon} alt="장바구니" />
          <CartProductCount>{cartProductCount}</CartProductCount>
          <Meaning>장바구니</Meaning>
        </FlexLink>
        <FlexLink to={ROUTE_PATH.ORDER_LIST}>
          <Icon src={orderList} alt="주문목록" />
          <Meaning>주문목록</Meaning>
        </FlexLink>
      </Box>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;
  height: var(--header-height);
  padding: 0 16.66%;
  border-bottom: solid 2px var(--color-grayscale-100);
  background-color: var(--color-pure-white);

  @media (max-width: 1280px) {
    padding: 0 8.33%;
  }

  @media (max-width: 768px) {
    padding: 0 4.16%;
    margin-bottom: 0;
  }
`;

const MainLogo = styled.img`
  width: 180px;
  height: 51px;
  aspect-ratio: 60 / 17;

  @media (max-width: 1280px) {
    width: 150px;
    height: 42px;
  }

  @media (max-width: 360px) {
    width: 120px;
    height: 34px;
  }
`;

const CartProductCount = styled.span`
  position: absolute;
  top: -4px;
  right: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: var(--color-primary-tone-down);
  text-align: center;
  font-size: 12px;
  font-weight: 700;
  line-height: 24px;
  color: var(--color-pure-white);
`;

const SelectBoxContainer = styled(Box)`
  :hover {
    background-color: var(--color-grayscale-100);
  }
`;

const FlexLink = styled(Link)`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  width: 46px;
  height: 50px;

  :hover {
    background-color: var(--color-grayscale-100);
  }
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
`;

const Meaning = styled.span`
  font-size: 12px;
  font-weight: 700;
  color: var(--color-pure-dark);
`;

export default Header;
