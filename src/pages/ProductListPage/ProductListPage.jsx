import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import cn from "classnames";

import { getProductList } from "@redux/reducers/product-list-reducer/productListThunks";

import styles from "./ProductListPage.module";
import ProductItem from "./components/ProductItem";

function ProductListPage() {
  const dispatch = useDispatch();
  const { isLoading, isError, productList } = useSelector((state) => ({
    productList: state.productList.data,
    ...state.productList.query.getProductList,
  }));

  useEffect(() => {
    dispatch(getProductList());
  }, [dispatch]);

  return (
    <div className="wrapper">
      <div className={cn(styles.productList)}>
        {productList &&
          productList.map((item) => <ProductItem key={item.id} {...item} />)}
      </div>
    </div>
  );
}

export default ProductListPage;
