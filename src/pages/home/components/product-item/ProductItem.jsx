import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { addProductToCart } from "@/redux/modules/cartList";
import { toggleSnackbarOpen } from "@/redux/modules/snackbar";

import CartIcon from "@/assets/images/cart.svg";

import Thumbnail from "@/pages/home/components/thumbnail/Thumbnail";
import ImageButton from "@/pages/home/components/image-button/ImageButton";

import StyledProductInfo from "@/pages/home/components/product-item/ProductInfo.styled";
import StyledProductItem from "@/pages/home/components/product-item/ProductItem.styled";

import { MESSAGE } from "@/constants";

function ProductItem({ id, name, price, imgUrl }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCartClick = () => {
    dispatch(addProductToCart({ id, name, price, imgUrl }));
    dispatch(toggleSnackbarOpen(MESSAGE.CART_ADDED));
  };

  const handleProductDetailClick = () => {
    navigate(`/detail/${id}`);
  };

  return (
    <>
      <StyledProductItem>
        <Thumbnail
          src={`${imgUrl}`}
          name={name}
          onClick={handleProductDetailClick}
        />
        <div className="content">
          <StyledProductInfo>
            <div className="l-left">
              <div className="product-title" onClick={handleProductDetailClick}>
                {name}
              </div>
              <div className="product-price">
                {price.toLocaleString("ko-KR")}원
              </div>
            </div>
            <div className="l-right">
              <ImageButton onClick={handleCartClick}>
                <CartIcon />
              </ImageButton>
            </div>
          </StyledProductInfo>
        </div>
      </StyledProductItem>
    </>
  );
}

export default ProductItem;
