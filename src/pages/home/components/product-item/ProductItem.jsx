import cn from "classnames";
import { useDispatch } from "react-redux";
import priceToDollar from "@utils/priceToDollar";
import Cart from "@assets/images/cart.svg";
import ImageButton from "@home/components/image-button/ImageButton";
import { addProductToCart } from "@redux/reducers/cart-reducer/cartThunks";
import styles from "@home/components/product-item/product-item.module";
import LoadingThumbnail from "@shared/loading-thumbnail/LoadingThumbnail";

function ProductItem({
  id: productId,
  name,
  price,
  thumbnailImage: { url: thumbnailUrl, alt },
  className,
}) {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(addProductToCart({ productId, quantity: 1 }));
  };

  return (
    <div className={cn(styles.productItem, className)}>
      <LoadingThumbnail
        src={`${thumbnailUrl}`}
        className={styles.thumbnail}
        alt={alt}
        minHeight="295"
      />
      <div className={cn(styles.content)}>
        <div className={cn(styles.productDetail)}>
          <div className={cn(styles.lLeft)}>
            <div className={cn(styles.productTitle)}>{name}</div>
            <div className={cn(styles.productPrice)}>
              {priceToDollar(price)}
            </div>
          </div>
          <div className="lRight">
            <ImageButton
              onClick={handleClick}
              className={cn("addToCartBtn", styles.addToCartBtn)}
            >
              <Cart width="36px" height="36px" fill="#00cc00" />
            </ImageButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
