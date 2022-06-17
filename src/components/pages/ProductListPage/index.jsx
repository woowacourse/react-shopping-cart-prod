import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import { useStore } from "hooks/useStore";
import { getProductList } from "reducers/productList";
import { getCartList } from "reducers/cartList";

import Spinner from "components/common/Spinner";
import ProductCard from "./ProductCard";
import GridContainer from "components/common/GridContainer";
import ErrorPage from "components/pages/ErrorPage";

function ProductListPage() {
  const {
    data: productList,
    isLoading,
    errorMessage,
    dispatch,
  } = useStore("productList");
  const cartList = useSelector((state) => state.cartList.data);

  useEffect(() => {
    dispatch(getProductList());
    dispatch(getCartList());
  }, []);

  if (isLoading) return <Spinner />;
  if (errorMessage)
    return (
      <ErrorPage>
        😱 Error: 관리자에게 문의하세요.😱 <br /> %{errorMessage}%
      </ErrorPage>
    );
  if (!productList?.length) return <h2>😱 텅 비었어요~~ 😱</h2>;

  return (
    <GridContainer colNo={4}>
      {productList.map((product) => (
        <ProductCard
          key={product.productId}
          product={product}
          isStored={cartList.some(
            (item) => item.productId === product.productId
          )}
        />
      ))}
    </GridContainer>
  );
}

export default ProductListPage;
