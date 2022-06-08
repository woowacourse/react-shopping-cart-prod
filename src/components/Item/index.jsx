import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { addCartItem } from "@/redux/modules/cart";

import CartIcon from "@/assets/images/cart.svg";

import Thumbnail from "@/components/Thumbnail";
import Button from "@/components/Button";

import { getCookie } from "@/utils/auth";

import {
  StyledProductInfo,
  StyledProductItem,
} from "@/components/Item/index.styled";

import { PATH, MESSAGE } from "@/constants";
import useFetch from "@/hooks/useFetch";

function Item({ id, name, price, imageUrl }) {
  const {
    data,
    success,
    getData: addCart,
  } = useFetch("post", "users/me/carts");

  useEffect(() => {}, [data, success]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCartClick = () => {
    const accessToken = getCookie("accessToken");

    if (!accessToken) {
      navigate(PATH.LOGIN);
      return;
    }

    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    addCart(
      {
        productId: id,
      },
      headers,
      MESSAGE.CART_ADDED
    );
  };

  useEffect(() => {
    if (success) {
      dispatch(addCartItem(id));
    }
  }, [data, success]);

  const handleProductDetailClick = () => {
    navigate(`${PATH.DETAIL}/${id}`);
  };

  return (
    <>
      <StyledProductItem>
        <Thumbnail
          src={`${imageUrl}`}
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

export default Item;
