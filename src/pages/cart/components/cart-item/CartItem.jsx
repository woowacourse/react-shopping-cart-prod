import cn from "classnames";
import priceToDollar from "@utils/priceToDollar";
import Checkbox from "@shared/checkbox/single/Checkbox";
import LoadingThumbnail from "@shared/loading-thumbnail/LoadingThumbnail";
import NumberInput from "@shared/number-input/NumberInput";
import FontawesomeIconButton from "@shared/fontawesome-icon-button/FontawesomeIconButton";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import styles from "./cart-item.module";

function CartItem({
  id: productId,
  name,
  thumbnail_image: { url, alt },
  quantity = 1,
  price,
  checked,
  onDelete,
  onChecked,
  onQuantityChange,
  className,
}) {
  return (
    <div className={cn(styles.cartItem, className)}>
      <Checkbox
        checked={checked}
        onChange={onChecked}
        className={styles.checkbox}
        id={productId}
      />
      <div className={styles.content}>
        <div className={styles.left}>
          <LoadingThumbnail className={styles.thumbnail} src={url} alt={alt} />
        </div>
        <div className={styles.middle}>
          <div className={styles.productName}>{name}</div>
        </div>
        <div className={styles.right}>
          <FontawesomeIconButton onClick={onDelete} icon={faTrashCan} />
          <NumberInput onChange={onQuantityChange} value={quantity} />
          <div className={styles.productPrice}>{priceToDollar(price)}</div>
        </div>
      </div>
    </div>
  );
}

CartItem.defaultProps = {
  onDelete: () => undefined,
  onQuantityChange: () => undefined,
  onChecked: () => undefined,
};

export default CartItem;
