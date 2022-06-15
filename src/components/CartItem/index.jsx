import React from "react";
import { useNavigate } from "react-router-dom";

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

function CartItem({ onChange, checked, item }) {
  const { getData: updateQuantity } = useFetch(
    "put",
    `users/me/carts/${item.id}`,
    updateCartQuantity
  );
  const { getData: deleteItem } = useFetch(
    "delete",
    `users/me/carts/${item.id}`,
    deleteCartItem,
    item.id
  );
  const navigate = useNavigate();

  const handleDetailClick = () => {
    navigate(`${PATH.DETAIL}/${id}`);
  };

  const handleIncrementClick = () => {
    updateQuantity({ quantity: item.quantity + 1 });
  };

  const handleDecrementClick = () => {
    updateQuantity({ quantity: item.quantity - 1 });
  };

  const handleRemoveIconClick = () => {
    deleteItem();
  };

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
              <Button onClick={handleIncrementClick} color="black">
                ▲
              </Button>
              <Button onClick={handleDecrementClick} color="black">
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
