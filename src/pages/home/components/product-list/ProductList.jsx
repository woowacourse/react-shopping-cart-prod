import cn from "classnames";
import { useDispatch, useSelector } from "react-redux";
import ProductItem from "@home/components/product-item/ProductItem";
import styles from "@home/components/product-list/product-list.module";
import { useEffect } from "react";
import { getProductList } from "@redux/reducers/product-list-reducer/productListThunks";

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
