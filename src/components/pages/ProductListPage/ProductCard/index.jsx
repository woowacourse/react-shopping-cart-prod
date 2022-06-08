import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import shoppingCartIconBlack from "asset/shopping-cart-icon-black.svg";

import { BASE_SERVER_URL, SERVER_PATH, ROUTES, USER_ID_KEY } from "constants";
import { postBaseServerCartItem } from "util/fetch";

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

function ProductCard({ product: { productId, thumbnailUrl, name, price } }) {
  const isLogin = useSelector((state) => state.user.isLogin);
  const navigate = useNavigate();

  const handleClickCardItem = () => {
    navigate(`${ROUTES.PRODUCT_DETAIL}/${productId}`);
  };

  const handleClickCartIconButton = async (e) => {
    e.stopPropagation();

    if (!isLogin) {
      alert("로그인이 필요합니다.");
      navigate(ROUTES.LOGIN);
      return;
    }

    try {
      const response = await postBaseServerCartItem({
        url: `${BASE_SERVER_URL}${
          SERVER_PATH.CUSTOMER_LIST
        }/${localStorage.getItem(USER_ID_KEY)}/carts`,
        body: JSON.stringify({ productId, count: 1 }),
      });

      if (!response.ok) {
        const data = await response.json();
        if (data.message) throw new Error(data.message);
        throw new Error(`문제가 발생했습니다. 잠시 후에 다시 시도해 주세요 :(`);
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
