import { useNavigate } from "react-router-dom";

import * as S from "./Logo.style";

import { GiFullPizza } from "react-icons/gi";

import { useRefreshCart } from "../../views/Cart/recoil/cartState";
import { useRefreshProduct } from "@views/Product/recoil/productListState";
import { styled } from "styled-components";
import { useRefreshCouponList } from "@views/Payment/recoil/couponListState";

function Logo() {
  const navigate = useNavigate();
  const refreshCart = useRefreshCart();
  const refreshProduct = useRefreshProduct();
  const refreshCoupon = useRefreshCouponList();
  const moveToHome = () => {
    refreshCart();
    refreshProduct();
    refreshCoupon();
    navigate("/");
  };

  return (
    <S.LogoWrapper
      type="button"
      aria-label="SHOP 홈페이지로 가기"
      role="button"
      onClick={moveToHome}
    >
      <S.LogoContainer>
        <GiFullPizza size="40" />
      </S.LogoContainer>
      <S.LogoName>핏-짜나라 치즈공듀</S.LogoName>
    </S.LogoWrapper>
  );
}

export default Logo;
