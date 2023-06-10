import { Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import CartIcon from '../../../assets/icons/CartIcon';
import { BASE_URL } from '../../../constant/server';
import serverNameState from '../../../globalState/atoms/serverName';
import { isProperServerName } from '../../../types/server';
import cartState from '../../../globalState/atoms/cartState';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import Modal from '../Modal/Modal';
import CouponList from '../../coupon/CouponList/CouponList';
import {
  CART_PAGE_PATH_NAME,
  ORDER_PAGE_PATH_NAME,
} from '../../../constant/route';

const Header = () => {
  const navigate = useNavigate();
  const [serverName, setServerName] = useRecoilState(serverNameState);

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleServerNameSelectChange: React.ChangeEventHandler<
    HTMLSelectElement
  > = (event) => {
    const selectedServerName = event.target.value;

    if (!isProperServerName(selectedServerName)) return;

    setServerName(selectedServerName);
  };

  const handleCartButtonClick = () => {
    navigate(CART_PAGE_PATH_NAME);
  };

  const handleOrderListButtonClick = () => {
    navigate(ORDER_PAGE_PATH_NAME);
  };

  return (
    <HeaderContainer>
      <Logo onClick={handleLogoClick}>
        <CartIcon />
        <Title>SHOP</Title>
      </Logo>
      <RightContainer>
        <Modal
          title="쿠폰 받기"
          trigger={<GetCouponButton>쿠폰 받기</GetCouponButton>}
        >
          <CouponList />
        </Modal>
        <select onChange={handleServerNameSelectChange} value={serverName}>
          {Object.keys(BASE_URL).map((serverNameOption) => (
            <option key={serverNameOption}>{serverNameOption}</option>
          ))}
        </select>
        <CartButton onClick={handleCartButtonClick}>
          <p>장바구니</p>
          <Suspense
            fallback={<LoadingSpinner diameter="26px" spinnerWidth="3px" />}
          >
            <TotalCartQuantity />
          </Suspense>
        </CartButton>
        <OrderListButton onClick={handleOrderListButtonClick}>
          주문 목록
        </OrderListButton>
      </RightContainer>
    </HeaderContainer>
  );
};

const TotalCartQuantity = () => {
  const cartList = useRecoilValue(cartState);

  return <CartTotalQuantity>{cartList.length}</CartTotalQuantity>;
};

const HeaderContainer = styled.header`
  position: fixed;

  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: 80px;

  padding: 0 10%;

  background-color: #333;

  color: #fff;

  z-index: 1;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  column-gap: 15px;

  cursor: pointer;
`;

const Title = styled.h1`
  font-size: 40px;
  font-weight: 900;
  padding-top: 8px;
`;

const RightContainer = styled.div`
  display: flex;
  gap: 25px;
`;

const GetCouponButton = styled.button`
  border: none;
  background: none;

  color: white;
`;

const CartButton = styled.button`
  display: flex;
  column-gap: 6px;
  font-size: 24px;

  border: none;
  background: none;

  color: white;

  cursor: pointer;

  @media screen and (max-width: 520px) {
    & > p {
      display: none;
    }
  }
`;

const CartTotalQuantity = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 26px;
  height: 26px;

  border-radius: 50%;
  background: #04c09e;

  font-size: 16px;
`;

const OrderListButton = styled.button`
  border: none;
  background: none;

  font-size: 24px;
  color: white;

  cursor: pointer;
`;

export default Header;
