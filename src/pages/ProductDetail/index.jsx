import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import useFetch from "@/hooks/useFetch";

import { addProductToCart } from "@/redux/modules/cartList";
import { toggleSnackbarOpen } from "@/redux/modules/snackbar";

import Button from "@/components/Button";
import Title from "@/components/Title";

import { MESSAGE } from "@/constants";

import StyledProductDetailContainer from "@/pages/ProductDetail/index.style";

function ProductDetail() {
  const { id } = useParams();
  const { data, error, success, getData } = useFetch("get", `products/${id}`);

  const handleCartClick = () => {
    const { name, price, imgUrl } = productInfo;
    dispatch(addProductToCart({ id, name, price, imgUrl }));
    dispatch(toggleSnackbarOpen(MESSAGE.CART_ADDED));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <StyledProductDetailContainer>
      <img src={data.imageUrl} alt={`${data.name}상세 페이지`} />
      <Title titleType="detailTitle">{data.name}</Title>
      <div className="product__price__wrapper">
        <div className="product__price__label">금액</div>
        <div className="product__price">
          {data.price?.toLocaleString("ko-KR")}원
        </div>
      </div>
      <Button onClick={handleCartClick}>장바구니</Button>
    </StyledProductDetailContainer>
  );
}

export default ProductDetail;
