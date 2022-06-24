import OrderTableItem from "./OrderTableItem";
import styles from "./OrderTable.module";

function OrderTable({ orderId, orderedProducts }) {
  return (
    <div>
      <div>주문번호: {orderId}</div>
      <div className={styles.table}>
        <table>
          <tbody>
            {orderedProducts.map((product) => {
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
