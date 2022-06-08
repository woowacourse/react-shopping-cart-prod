import React from "react";
import { useNavigate } from "react-router-dom";

import shoppingCartIconBlack from "asset/shopping-cart-icon-black.svg";

import { BASE_SERVER_URL, SERVER_PATH, ROUTES, COOKIE_KEY } from "constants";
import { postBaseServerCartItem } from "util/fetch";
import { getCookie } from "util/cookie";

import IconButton from "components/common/Button/IconButton";
import {
  CardBottom,
  CardContainer,
  ImageWrapper,
  InfoWrapper,
  ProductName,
  ProductPrice,
  ProductThumbnail,
} from "./styled";
import { useSelector } from "react-redux";

function ProductCard({ product: { productId, thumbnailUrl, name, price } }) {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const handleClickCardItem = () => {
    navigate(`${ROUTES.PRODUCT_DETAIL}/${productId}`);
  };

  const handleClickCartIconButton = async (e) => {
    e.stopPropagation();
    if (!isLoggedIn) {
      alert("장바구니에 담으려면 로그인이 필요합니다.");
      return;
    }
    try {
      const response = await postBaseServerCartItem({
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie(COOKIE_KEY.TOKEN)}`,
        },
        url: `${BASE_SERVER_URL}${SERVER_PATH.CUSTOMER_LIST}/${getCookie(
          COOKIE_KEY.USER_ID
        )}${SERVER_PATH.CART_LIST}`,
        body: JSON.stringify({ productId, count: 1 }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }
    } catch (error) {
      alert(error.message);
      return;
    }
    alert("장바구니에 담았습니다.");
  };

  return (
    <CardContainer onClick={handleClickCardItem}>
      <ImageWrapper>
        <ProductThumbnail bgImage={thumbnailUrl ?? ""} alt={name} />
      </ImageWrapper>
      <CardBottom>
        <InfoWrapper>
          <ProductName>{name ?? "%Error%"}</ProductName>
          <ProductPrice>{price?.toLocaleString() ?? "%Error%"}원</ProductPrice>
        </InfoWrapper>
        <IconButton
          onClick={handleClickCartIconButton}
          src={shoppingCartIconBlack}
          alt="장바구니 담기 버튼"
          width="30px"
        />
      </CardBottom>
    </CardContainer>
  );
}

export default ProductCard;
