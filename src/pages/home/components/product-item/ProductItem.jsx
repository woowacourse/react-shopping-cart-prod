import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { addProductToCart } from "@/redux/modules/cartList";

import StyledProductItem from "@/pages/home/components/product-item/ProductItem.styled";
import Thumbnail from "@/pages/home/components/thumbnail/Thumbnail";
import ImageButton from "@/pages/home/components/image-button/ImageButton";
import CartIcon from "@/assets/images/cart.svg";
import StyledProductInfo from "./ProductInfo.styled";

function ProductItem({ id, name, price, imgUrl }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCartClick = () => {
    dispatch(addProductToCart({ id, name, price, imgUrl }));
  };

  // 클릭하면
  // 상세페이지로 이동
  // id 값에 따라서
  const handleProductDetailClick = () => {
    console.log("hi");
    navigate(`/detail/${id}`);
  };

  return (
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
  );
}

export default ProductItem;
