import { useNavigate } from "react-router-dom";

import { addCartItem } from "@/redux/modules/cart";

import useFetch from "@/hooks/useFetch";

import CartIcon from "@/assets/images/cart.svg";

import Thumbnail from "@/components/Thumbnail";
import Button from "@/components/Button";

import { getCookie } from "@/utils/auth";

import {
  StyledProductInfo,
  StyledProductItem,
} from "@/components/Item/index.styled";

import { PATH, MESSAGE } from "@/constants";

function Item({ id, name, price, imageUrl }) {
  const { getData: addCart } = useFetch("post", "users/me/carts", addCartItem);

  const navigate = useNavigate();

  const handleCartClick = () => {
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

  const handleProductDetailClick = () => {
    navigate(`${PATH.DETAIL}/${id}`);
  };

  return (
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
  );
}

export default Item;
