import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import cn from "classnames";

import { addProductToCart } from "@redux/reducers/cart-reducer/cartThunks";
import LoadingThumbnail from "@components/LoadingThumbnail";

import priceToDollar from "@utils/priceToDollar";
import CartPage from "@assets/images/cart.svg";
import ImageButton from "./ImageButton";
import styles from "./ProductItem.module";

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
      <Link to={`/product/${productId}`}>
        <LoadingThumbnail
          src={`${thumbnailUrl}`}
          className={styles.thumbnail}
          alt={alt}
          minHeight="295"
        />
      </Link>
      <div className={cn(styles.content)}>
        <div className={cn(styles.productDetail)}>
          <div className={cn(styles.lLeft)}>
            <Link to={`/product/${productId}`}>
              <div className={cn(styles.productTitle)}>{name}</div>
              <div className={cn(styles.productPrice)}>
                {priceToDollar(price)}
              </div>
            </Link>
          </div>
          <div className="lRight">
            <ImageButton
              onClick={handleClick}
              className={cn("addToCartBtn", styles.addToCartBtn)}
            >
              <CartPage width="36px" height="36px" fill="#00cc00" />
            </ImageButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
