import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { addProductToCart } from "@/redux/modules/cartList";
import { toggleSnackbarOpen } from "@/redux/modules/snackbar";

import Button from "@/components/common/button/Button";

import { getProductDetail } from "@/redux/modules/productDetail";
import Error from "@/components/pages/error/Error";

import Loading from "@/components/common/loading/Loading";

import { MESSAGE } from "@/constants";

import StyledProductDetailContainer from "@/components/pages/product-detail/ProductDetail.styled";

function ProductDetail() {
  const { data, loading, error } = useSelector((state) => {
    return state.productDetailState;
  });

  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getProductDetail(id));
  }, [dispatch]);

  const handleCartClick = () => {
    const { name, price, imgUrl } = data;
    dispatch(addProductToCart({ id, name, price, imgUrl }));
    dispatch(toggleSnackbarOpen(MESSAGE.CART_ADDED));
  };

  if (loading) return <Loading />;
  if (error) return <Error />;

  return (
    data && (
      <StyledProductDetailContainer>
        <img src={data.imgUrl} alt={`${data.name}상세 페이지`} />
        <div className="product__name">{data.name}</div>
        <hr />
        <div className="product__price__wrapper">
          <div className="product__price__label">금액</div>
          <div className="product__price">
            {data.price.toLocaleString("ko-KR")}원
          </div>
        </div>
        <Button
          text="장바구니"
          width="100%"
          height="50px"
          backgroundColor="#73675C"
          fontSize="20px"
          onClick={handleCartClick}
        />
      </StyledProductDetailContainer>
    )
  );
}

export default ProductDetail;
