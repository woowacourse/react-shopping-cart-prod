import cn from "classnames";

import PageTitle from "@components/PageTitle";
import { useEffect } from "react";
import CartForm from "./components/CartItemList";
import CartTotal from "./components/CartTotal";

import { API_SERVER, FETCH_STATUS, REQUEST_METHOD } from "../../constants";

import styles from "./CartPage.module";
import { useFetch } from "../../hooks/useFetch";

function CartPage() {
  const {
    fetch: getCartItemList,
    data: cartItemList,
    status,
    error,
  } = useFetch(
    REQUEST_METHOD.GET,
    `${API_SERVER.BASE_URL}${API_SERVER.PATH.MY_CARTS}`,
    []
  );

  useEffect(() => {
    getCartItemList();
  }, []);

  if (status === FETCH_STATUS.PENDING) return <div>...Loading</div>;
  if (status === FETCH_STATUS.FAIL) return <div>ERROR!! : {error.message}</div>;

  return (
    <div className="wrapper">
      <div className={cn(styles.cart)}>
        <PageTitle className="mb-50">장바구니</PageTitle>
        <div className={styles.container}>
          <CartForm className={styles.cartForm} />
          <CartTotal className={styles.cartTotal} />
        </div>
      </div>
    </div>
  );
}

export default CartPage;
