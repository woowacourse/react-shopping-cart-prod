import React from "react";
import { useNavigate } from "react-router-dom";

import shoppingCartIconBlack from "asset/shopping-cart-icon-black.svg";

import { BASE_SERVER_URL, SERVER_PATH, ROUTES } from "constants";
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

function ProductCard({ product: { id, thumbnailUrl, name, price } }) {
  const navigate = useNavigate();

  const handleClickCardItem = () => {
    navigate(`${ROUTES.PRODUCT_DETAIL}/${id}`);
  };

  const handleClickCartIconButton = async (e) => {
    e.stopPropagation();
    try {
      const response = await postBaseServerCartItem({
        url: `${BASE_SERVER_URL}${SERVER_PATH.CART_LIST}`,
        body: JSON.stringify({ id, count: 1 }),
      });

      if (!response.ok) {
        throw new Error(`문제가 발생했습니다. 잠시 후에 다시 시도해 주세요 :(`);
      }

      const { isAlreadyExists } = await response.json();
      if (isAlreadyExists) {
        alert("이미 장바구니에 담은 상품입니다.");
        return;
      }
    } catch (error) {
      alert(`장바구니 담기에 실패했습니다.`);
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
