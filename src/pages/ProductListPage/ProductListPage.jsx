import { useEffect } from "react";
import cn from "classnames";

import { useFetch } from "../../hooks/useFetch";

import ProductItem from "./components/ProductItem";

import { API_SERVER, FETCH_STATUS, REQUEST_METHOD } from "../../constants";
import styles from "./ProductListPage.module";
import PageLoader from "../../components/PageLoader";
import PageErrorResult from "../../components/PageErrorResult";

function ProductListPage() {
  const {
    fetch: getProductList,
    data: productList,
    status,
    error,
  } = useFetch({
    method: REQUEST_METHOD.GET,
    url: `${API_SERVER.BASE_URL}${API_SERVER.PATH.PRODUCTS}`,
    initialData: [],
  });

  useEffect(() => {
    getProductList();
  }, []);

  if (status === FETCH_STATUS.PENDING) return <PageLoader />;
  if (status === FETCH_STATUS.FAIL)
    return <PageErrorResult errorMessage={error.message} />;

  return (
    <div className="wrapper">
      <div className={cn(styles.productList)}>
        {productList.length === 0 ? (
          <div className={styles.noProductItem}>상품이 없습니다. 😥</div>
        ) : (
          productList.map((item) => <ProductItem key={item.id} {...item} />)
        )}
      </div>
    </div>
  );
}

export default ProductListPage;
