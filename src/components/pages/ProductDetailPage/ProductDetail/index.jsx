import React from "react";

import { theme } from "style";

import { BASE_SERVER_URL, SERVER_PATH } from "constants";
import { postBaseServerCartItem } from "util/fetch";

import DefaultButton from "components/common/Button/DefaultButton";
import {
  Bottom,
  ProductImage,
  ProductName,
  ProductPrice,
  ProductPriceTitle,
  Top,
} from "./styled";

function ProductDetail({ selectedProduct: { id, thumbnailUrl, name, price } }) {
  const handleClickCartButton = async () => {
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
