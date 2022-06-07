import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { updateCartQuantity, deleteCartItem } from "@/redux/modules/cart";

import TrashIcon from "@/assets/images/trash.svg";

import Checkbox from "@/components/Checkbox";
import Button from "@/components/Button";

import { PATH } from "@/constants";

import {
  StyledCartContainer,
  StyledHr,
} from "@/components/CartItem/index.styled";
import useFetch from "@/hooks/useFetch";
import { getCookie } from "@/utils/auth";

function CartItem({ onChange, checked, item }) {
  const {
    data: updateData,
    success: updateSuccess,
    getData: updateQuantity,
  } = useFetch("put", `users/me/carts/${item.id}`);
  const {
    data: deleteData,
    success: deleteSuccess,
    getData: deleteItem,
  } = useFetch("delete", `users/me/carts/${item.id}`);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDetailClick = () => {
    navigate(`${PATH.DETAIL}/${id}`);
  };

  const handleIncrementClick = () => {
    const accessToken = getCookie("accessToken");

    if (!accessToken) {
      navigate(PATH.LOGIN);
    }

    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    updateQuantity({ quantity: item.quantity + 1 }, headers);
  };

  const handleDecrementClick = () => {
    const accessToken = getCookie("accessToken");

    if (!accessToken) {
      navigate(PATH.LOGIN);
    }

    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    updateQuantity({ quantity: item.quantity - 1 }, headers);
  };

  const handleRemoveIconClick = () => {
    const accessToken = getCookie("accessToken");

    if (!accessToken) {
      navigate(PATH.LOGIN);
    }

    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    deleteItem({}, headers);
  };

  useEffect(() => {
    if (updateSuccess) {
      dispatch(updateCartQuantity(updateData.id, updateData.quantity));
    }
  }, [updateData, updateSuccess]);

  useEffect(() => {
    if (deleteSuccess) {
      dispatch(deleteCartItem(item.id));
    }
  }, [deleteData, deleteSuccess]);

  return (
    <>
      <StyledCartContainer>
        <div className="product-item__left">
          <Checkbox onChange={onChange} checked={checked} />
          <img
            src={item.imageUrl}
            alt={`${item.name} 장바구니 이미지`}
            onClick={handleDetailClick}
          />
          <a onClick={handleDetailClick}>{item.name}</a>
        </div>
        <div className="product-item__right">
          <Button onClick={handleRemoveIconClick}>
            <TrashIcon />
          </Button>
          <div className="quantity__container">
            <div className="quantity">{item.quantity}</div>
            <div className="quantity__buttons">
              <Button onClick={handleIncrementClick} color="black1">
                ▲
              </Button>
              <Button onClick={handleDecrementClick} color="black1">
                ▼
              </Button>
            </div>
          </div>
          <span className="cart-price">
            {(item.price * item.quantity).toLocaleString("ko-KR")}원
          </span>
        </div>
      </StyledCartContainer>
      <StyledHr />
    </>
  );
}

export default CartItem;
