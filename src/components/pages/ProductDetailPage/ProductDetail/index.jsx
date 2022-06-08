import React from "react";

import { theme } from "style";

import { BASE_SERVER_URL, SERVER_PATH, COOKIE_KEY } from "constants";
import { postBaseServerCartItem } from "util/fetch";
import { getCookie } from "util/cookie";

import DefaultButton from "components/common/Button/DefaultButton";
import {
  Bottom,
  ProductImage,
  ProductName,
  ProductPrice,
  ProductPriceTitle,
  Top,
} from "./styled";

function ProductDetail({
  selectedProduct: { productId, thumbnailUrl, name, price },
}) {
  const handleClickCartButton = async () => {
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
    <>
      <Top>
        <ProductImage src={thumbnailUrl ?? ""} alt={name} />
        <ProductName>{name ?? "%Error%"}</ProductName>
      </Top>
      <Bottom>
        <ProductPriceTitle>금액</ProductPriceTitle>
        <ProductPrice>{price?.toLocaleString() ?? "%Error%"}원</ProductPrice>
      </Bottom>
      <DefaultButton
        onClick={handleClickCartButton}
        bgColor={theme.color.point}
      >
        장바구니 담기
      </DefaultButton>
    </>
  );
}

export default ProductDetail;
