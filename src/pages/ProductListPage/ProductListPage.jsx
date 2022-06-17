import { useEffect } from "react";
import cn from "classnames";

import { useFetch } from "../../hooks/useFetch";

import ProductItem from "./components/ProductItem";

import { API_SERVER, FETCH_STATUS, REQUEST_METHOD } from "../../constants";
import styles from "./ProductListPage.module";

function ProductListPage() {
  const {
    fetch: getProductList,
    data: productList,
    status,
    error,
  } = useFetch(
    REQUEST_METHOD.GET,
    `${API_SERVER.BASE_URL}${API_SERVER.PATH.PRODUCTS}`,
    []
  );

  useEffect(() => {
    getProductList();
  }, []);

  if (status === FETCH_STATUS.PENDING) return <div>...Loading</div>;
  if (status === FETCH_STATUS.FAIL) return <div>ERROR!! : {error.message}</div>;

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
