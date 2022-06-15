import cn from "classnames";

import PageTitle from "@components/PageTitle";
import CartForm from "./components/CartForm";
import CartTotal from "./components/CartTotal";

import styles from "./CartPage.module";

function CartPage() {
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
