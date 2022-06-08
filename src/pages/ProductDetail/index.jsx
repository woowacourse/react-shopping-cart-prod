import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { addCartItem } from "@/redux/modules/cart";

import useFetch from "@/hooks/useFetch";

import Button from "@/components/Button";
import Title from "@/components/Title";

import { MESSAGE } from "@/constants";
import { getCookie } from "@/utils/auth";

import StyledProductDetailContainer from "@/pages/ProductDetail/index.style";

function ProductDetail() {
  const { id } = useParams();
  const { data: detailData, getData: getDetailData } = useFetch(
    "get",
    `products/${id}`
  );
  const { success: cartSuccess, getData: addCart } = useFetch(
    "post",
    "users/me/carts"
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCartClick = () => {
    const { id } = detailData;
    const accessToken = getCookie("accessToken");

    if (!accessToken) {
      navigate(PATH.LOGIN);
      return;
    }

    addCart(
      {
        productId: id,
      },
      MESSAGE.CART_ADDED
    );
  };

  useEffect(() => {
    getDetailData();
  }, []);

  useEffect(() => {
    if (cartSuccess) {
      dispatch(addCartItem(detailData));
    }
  }, [cartSuccess]);

  return (
    <StyledProductDetailContainer>
      <img src={detailData.imageUrl} alt={`${detailData.name}상세 페이지`} />
      <Title titleType="detailTitle">{detailData.name}</Title>
      <div className="product__price__wrapper">
        <div className="product__price__label">금액</div>
        <div className="product__price">
          {detailData.price?.toLocaleString("ko-KR")}원
        </div>
      </div>
      <Button onClick={handleCartClick}>장바구니</Button>
    </StyledProductDetailContainer>
  );
}

export default ProductDetail;
