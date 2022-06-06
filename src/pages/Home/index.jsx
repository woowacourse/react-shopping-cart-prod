import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getProductList } from "@/redux/modules/productList";

import Error from "@/pages/Error";

import Loading from "@/components/Loading";
import ProductItem from "@/components/Item";

import StyledProductList from "@/pages/Home/index.styled";

function ProductList() {
  const { data, loading, error } = useSelector(
    (state) => state.productListState.productList
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductList());
  }, []);

  if (loading) return <Loading />;
  if (error) return <Error />;

  return (
    <StyledProductList>
      {data && data.map((item) => <ProductItem key={item.id} {...item} />)}
    </StyledProductList>
  );
}

export default ProductList;
