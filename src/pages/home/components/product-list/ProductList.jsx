import cn from "classnames";
import { useDispatch, useSelector } from "react-redux";
import ProductItem from "@home/components/product-item/ProductItem";
import styles from "@home/components/product-list/product-list.module";
import { useEffect } from "react";
import { updateProductList } from "@redux/reducers/product-reducer/productThunks";

function ProductList({ className }) {
  const dispatch = useDispatch();
  const {
    isLoading,
    isError,
    data: productList,
  } = useSelector((state) => state.product.productList);

  useEffect(() => {
    dispatch(updateProductList());
  }, [dispatch]);

  if (isLoading) return <div>is loading ...</div>;
  if (isError) return <div>is error...</div>;

  return (
    <div className={cn(styles.productList, className)}>
      {productList.map((item) => (
        <ProductItem key={item.id} {...item} />
      ))}
    </div>
  );
}

export default ProductList;
