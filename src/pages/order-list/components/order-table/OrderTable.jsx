import OrderTableItem from "../order-table-item/OrderTableItem";
import styles from "./order-table.module";

function OrderTable({ orderId, orderedProducts }) {
  return (
    <div className={styles.container}>
      <div className={styles.title}>주문번호: {orderId}</div>
      <div className={styles.table}>
        <table>
          <tbody>
            {orderedProducts.map((product) => {
              console.log("product :", product);
              return (
                <tr key={product.id}>
                  <td>
                    <OrderTableItem {...product} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrderTable;
