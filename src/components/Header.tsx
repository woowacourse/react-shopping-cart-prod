import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { ROUTER_PATH } from "router";
import { cartListState } from "recoil/cart";
import ServerSelector from "./ServerSelector";

const Header = () => {
  const navigate = useNavigate();
  const cartCount = useRecoilValue(cartListState).length;

  const goToMain = () => {
    navigate(ROUTER_PATH.Main);
  };

  const goToCart = () => {
    navigate(ROUTER_PATH.Cart);
  };

  const goToOrderList = () => {
    navigate(ROUTER_PATH.OrderList);
  };

  return (
    <Wrapper>
      <TitleContainer onClick={goToMain}>
        <img
          src={process.env.PUBLIC_URL + "/assets/cart-icon.svg"}
          alt="홈카트"
        />
        <Title>SHOP</Title>
      </TitleContainer>
      <ServerSelector />
      <OrderContainer onClick={goToOrderList}>주문목록</OrderContainer>
      <CartContainer onClick={goToCart}>
        장바구니
        {cartCount > 0 && <ItemQuantityBox>{cartCount}</ItemQuantityBox>}
      </CartContainer>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: grid;
  grid-template-columns: 3fr auto auto;
  grid-template-rows: 70px;
  align-items: center;
  gap: 0 20px;

  position: fixed;
  z-index: 1;
  top: 0;

  width: 100%;
  height: 70px;
  padding: 0 5%;

  background: #333333;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: end;
  align-items: flex-end;
  gap: 10px;

  cursor: pointer;

  & > img {
    width: 40px;
    height: 40px;
  }
`;

const Title = styled.p`
  color: white;
  font-weight: 900;
  font-size: 2rem;

  @media (max-width: 767px) {
    display: none;
  }
`;

const CartContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 5px;
  width: 110px;

  font-size: 22px;
  font-weight: 400;
  color: white;

  cursor: pointer;

  @media (max-width: 767px) {
    font-size: 16px;
    width: 90px;
  }
`;

const ItemQuantityBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;

  background: #04c09e;
  border-radius: 50%;

  font-size: 16px;
  font-weight: 500;
  color: #ffffff;
`;

const OrderContainer = styled.div`
  font-size: 22px;
  font-weight: 400;
  color: white;

  cursor: pointer;

  @media (max-width: 1199px) {
    font-size: 20px;
  }

  @media (max-width: 767px) {
    font-size: 16px;
  }
`;

export default Header;
