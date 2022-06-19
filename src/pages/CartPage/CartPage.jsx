import cn from "classnames";

import PageTitle from "@components/PageTitle";
import { useEffect } from "react";
import CartItemList from "./components/CartItemList";
import CartTotal from "./components/CartTotal";

import { API_SERVER, FETCH_STATUS, REQUEST_METHOD } from "../../constants";

import styles from "./CartPage.module";
import { useFetch } from "../../hooks/useFetch";
import PageLoader from "../../components/PageLoader";
import PageErrorResult from "../../components/PageErrorResult";

function CartPage() {
  const {
    fetch: getCartItemList,
    data: cartItemList,
    status,
    error,
  } = useFetch({
    method: REQUEST_METHOD.GET,
    url: `${API_SERVER.BASE_URL}${API_SERVER.PATH.MY_CARTS}`,
    initialData: [],
  });

  useEffect(() => {
    getCartItemList();
  }, []);

  if (status === FETCH_STATUS.PENDING) return <PageLoader />;
  if (status === FETCH_STATUS.FAIL)
    return <PageErrorResult errorMessage={error.message} />;

  return (
    <div className="wrapper">
      <div className={cn(styles.cart)}>
        <PageTitle className="mb-50">장바구니</PageTitle>
        <div className={styles.container}>
          <CartItemList className={styles.cartForm} />
          <CartTotal className={styles.cartTotal} />
        </div>
      </div>
    </div>
  );
}

export default CartPage;
