import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import cn from "classnames";

import { getProductList } from "@redux/reducers/product-list-reducer/productListThunks";
import ProductItem from "../ProductItem/ProductItem";
import styles from "./ProductList.module";

function ProductList({ className }) {
  const dispatch = useDispatch();
  const { isLoading, isError, productList } = useSelector((state) => ({
    productList: state.productList.data,
    ...state.productList.query.getProductList,
  }));

  useEffect(() => {
    dispatch(getProductList());
  }, [dispatch]);

  if (isLoading) return <div>is loading ...</div>;
  if (isError) return <div>is error...</div>;

  return (
    <div className={cn(styles.productList, className)}>
      {productList &&
        productList.map((item) => <ProductItem key={item.id} {...item} />)}
    </div>
  );
}

export default ProductList;
