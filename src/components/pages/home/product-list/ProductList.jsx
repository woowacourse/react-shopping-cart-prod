import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getProductList } from "@/redux/modules/productList";

import Error from "@/components/pages/error/Error";

import Loading from "@/components/common/loading/Loading";
import ProductItem from "@/components/pages/home/product-item/ProductItem";

import StyledProductList from "@/components/pages/home/product-list/ProductList.styled";
import { getCartList } from "@/redux/modules/cartList";

function ProductList() {
  const { data, loading, error } = useSelector(
    (state) => state.productListState.productList
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductList());
    dispatch(getCartList());
  }, [dispatch]);

  if (loading) return <Loading />;
  if (error) return <Error />;

  return (
    <StyledProductList>
      {data && data.map((item) => <ProductItem key={item.id} {...item} />)}
    </StyledProductList>
  );
}

export default ProductList;
