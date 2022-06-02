import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import StyledProductDetailContainer from "@/pages/product-detail/ProductDetail.style";
import Button from "@/components/button/Button";

import { BASE_URL } from "@/constants";

function ProductDetail() {
  const [productInfo, setProductInfo] = useState({});
  const { id } = useParams();

  const getProductDetail = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/products/${id}`);
      setProductInfo(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProductDetail();
  }, []);

  return (
    <StyledProductDetailContainer>
      <img src={productInfo.imgUrl} alt={`${productInfo.name}상세 페이지`} />
      <div className="product__name">{productInfo.name}</div>
      <hr />
      <div className="product__price__wrapper">
        <div className="product__price__label">금액</div>
        <div className="product__price"> {productInfo.price}원</div>
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
