import styled from "styled-components";
import { CartIcon } from "../assets";
import { useRecoilValue } from "recoil";
import { cartNumberSelector } from "../recoil/selector";
import { ROUTER_PATH } from "../router";
import { useRouter } from "../hooks/useRouter";
import { loginState, userState } from "../recoil/atom";
import { useLocation } from "react-router-dom";
import { ServerSelectBox } from "./ServerSelectBox";
import { useLoginForm } from "../hooks/useLoginForm";

export const Header = () => {
  const { goPage } = useRouter();
  const { logout } = useLoginForm();
  const location = useLocation();
  const user = useRecoilValue(userState);
  const cartNumber = useRecoilValue(cartNumberSelector);
  const isLogined = useRecoilValue(loginState);

  return (
    <Wrapper>
      <TitleContainer onClick={goPage(ROUTER_PATH.Main)}>
        <img src={CartIcon} alt="홈카트" />
        <p>SHOP</p>
      </TitleContainer>
      <NavContainer>
        <ServerSelectBox />
        {!isLogined ? (
          <p onClick={goPage(ROUTER_PATH.Login)}>로그인</p>
        ) : (
          <>
            <CartContainer onClick={goPage(ROUTER_PATH.Cart)}>
              <CartBox pathname={location.pathname}>
                {user.nickname}의 장바구니
              </CartBox>
              <CartIconBox src={CartIcon} alt="홈카트" />
              {cartNumber > 0 && (
                <ItemQuantityBox>{cartNumber}</ItemQuantityBox>
              )}
            </CartContainer>
            <OrderBox
              pathname={location.pathname}
              onClick={goPage(ROUTER_PATH.OrderHistory)}
            >
              주문목록
            </OrderBox>
            <span onClick={logout}>로그아웃</span>
          </>
        )}
      </NavContainer>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;

  position: fixed;
  z-index: 1;
  top: 0;

  width: 100%;
  min-height: 70px;
  padding: 0 10%;

  background: var(--dark-gray);
`;

const TitleContainer = styled.section`
  display: flex;
  align-items: end;
  gap: 5%;

  cursor: pointer;

  & > p {
    color: white;
    font-weight: 900;
    font-size: 2rem;

    @media screen and (max-width: 850px) {
      font-size: 1.3rem;
    }
  }

  & > img {
    width: 46px;
    height: 46px;

    @media screen and (max-width: 850px) {
      width: 35px;
      height: 35px;
    }
  }
`;

const NavContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  font-size: 21px;
  font-weight: 500;
  color: white;
  cursor: pointer;

  & > span {
    font-size: 14px;
    color: gray;
  }

  @media screen and (max-width: 850px) {
    font-size: 18px;
  }
`;

const CartIconBox = styled.img`
  display: none;
  width: 25px;
  height: 25px;
`;

const CartContainer = styled.section`
  display: flex;
  align-items: center;

  position: relative;
  z-index: 10;

  @media screen and (max-width: 850px) {
    ${CartIconBox} {
      display: flex;
    }
  }
`;

const CartBox = styled.p<{ pathname: string }>`
  color: ${(props) =>
    props.pathname === ROUTER_PATH.Cart || props.pathname === ROUTER_PATH.Order
      ? "white"
      : "gray"};
  @media screen and (max-width: 850px) {
    display: none;
  }
`;

const OrderBox = styled.p<{ pathname: string }>`
  color: ${(props) =>
    props.pathname === ROUTER_PATH.OrderHistory ||
    props.pathname === ROUTER_PATH.OrderDetail
      ? "white"
      : "gray"};
`;

const ItemQuantityBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;

  position: absolute;
  top: -11px;
  right: -11px;

  padding-top: 3px;
  background: var(--mintish-green);
  border-radius: 50%;

  font-size: 13px;
  font-weight: 600;
  color: white;
`;
