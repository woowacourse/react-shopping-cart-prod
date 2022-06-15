import cn from "classnames";

import CheckBox from "@components/CheckBox/default/CheckBox";
import LoadingThumbnail from "@components/LoadingThumbnail";
import NumberInput from "@components/NumberInput";
import FontawesomeIconButton from "@components/FontawesomeIconButton";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import priceToDollar from "@utils/priceToDollar";

import styles from "./CartItem.module";

function CartItem({
  id: productId,
  name,
  thumbnailImage: { url, alt },
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
      <CheckBox
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
