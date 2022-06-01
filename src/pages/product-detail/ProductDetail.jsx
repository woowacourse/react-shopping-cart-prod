import React from "react";

import StyledProductDetailContainer from "@/pages/product-detail/ProductDetail.style";
import Button from "@/components/button/Button";

function ProductDetail({ name, price, imgUrl }) {
  return (
    <StyledProductDetailContainer>
      <img src={imgUrl} alt={`${name}상세 페이지`} />
      <div className="product__name">{name}</div>
      <hr />
      <div className="product__price__wrapper">
        <div className="product__price__label">금액</div>
        <div className="product__price"> {price}원</div>
      </div>
      <Button
        text="장바구니"
        width="100%"
        height="50px"
        backgroundColor="#73675C"
        fontSize="20px"
      />
    </StyledProductDetailContainer>
  );
}

export default ProductDetail;
