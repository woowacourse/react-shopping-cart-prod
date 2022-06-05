import React from "react";
import { useDispatch } from "react-redux";

import {
  toggleCartItemCheckButton,
  incrementCartItemQuantity,
  decrementCartItemQuantity,
  removeRowCartItem,
} from "@/redux/modules/cartList";

import TrashIcon from "@/assets/images/trash.svg";

import Checkbox from "@/components/Checkbox";
import Button from "@/components/Button";

import {
  StyledCartContainer,
  StyledHr,
} from "@/components/CartItem/index.styled";

function ProductItem({ item }) {
  const { id, name, price, imgUrl, quantity, checked } = item;
  const dispatch = useDispatch();

  const handleChange = () => {
    dispatch(toggleCartItemCheckButton(id));
  };

  const handleIncrementClick = () => {
    dispatch(incrementCartItemQuantity(id));
  };

  const handleDecrementClick = () => {
    dispatch(decrementCartItemQuantity(id));
  };

  const handleRemoveIconClick = () => {
    dispatch(removeRowCartItem(id));
  };

  return (
    <>
      <StyledCartContainer>
        <div className="product-item__left">
          <Checkbox onChange={handleChange} checked={checked} />
          <img src={imgUrl} alt={`${name} 장바구니 이미지`} />
          <p>{name}</p>
        </div>
        <div className="product-item__right">
          <Button onClick={handleRemoveIconClick}>
            <TrashIcon />
          </Button>
          <div className="quantity__container">
            <div className="quantity">{quantity}</div>
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
            {(price * quantity).toLocaleString("ko-KR")}원
          </span>
        </div>
      </StyledCartContainer>
      <StyledHr />
    </>
  );
}

export default ProductItem;
