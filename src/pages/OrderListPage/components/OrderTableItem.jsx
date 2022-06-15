import cn from "classnames";

import LoadingThumbnail from "@components/LoadingThumbnail";
import Button from "@components/Button";

import priceToDollar from "@utils/priceToDollar";
import styles from "./OrderTableItem.module";

function OrderTableItem({ name, price, thumbnailImage, quantity, className }) {
  const handleClick = () => {
    alert("준비중입니다...");
  };

  return (
    <div className={cn(styles.orderTableItem, className)}>
      <div className={styles.content}>
        <div className={styles.left}>
          <LoadingThumbnail
            className={styles.thumbnail}
            src={thumbnailImage.url}
            alt={thumbnailImage.alt}
          />
        </div>
        <div className={styles.middle}>
          <div className={styles.name}>{name}</div>
          <div className={styles.subInfo}>
            {priceToDollar(price)} / 수량 : {quantity}개
          </div>
        </div>
        <div className={styles.right}>
          <Button variant="primary" onClick={handleClick}>
            장바구니
          </Button>
        </div>
      </div>
    </div>
  );
}

export default OrderTableItem;
