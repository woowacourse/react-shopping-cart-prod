import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { addProductToCart } from "@/redux/modules/cartList";
import { toggleSnackbarOpen } from "@/redux/modules/snackbar";

import CartIcon from "@/assets/images/cart.svg";

import Thumbnail from "@/components/Thumbnail";
import Button from "@/components/Button";

import {
  StyledProductInfo,
  StyledProductItem,
} from "@/components/Item/index.styled";

import { PATH, MESSAGE } from "@/constants";

function Home({ id, name, price, imgUrl }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCartClick = () => {
    dispatch(addProductToCart({ id, name, price, imgUrl }));
    dispatch(toggleSnackbarOpen(MESSAGE.CART_ADDED));
  };

  const handleProductDetailClick = () => {
    navigate(`${PATH.DETAIL}/${id}`);
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
              <Button onClick={handleCartClick}>
                <CartIcon />
              </Button>
            </div>
          </StyledProductInfo>
        </div>
      </StyledProductItem>
    </>
  );
}

export default Home;
