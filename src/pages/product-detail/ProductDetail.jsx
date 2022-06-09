import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import priceToDollar from "@utils/priceToDollar";
import { getProductDetail } from "@redux/reducers/product-detail-reducer/productDetailThunks";
import { addProductToCart } from "@redux/reducers/cart-reducer/cartThunks";
import LoadingThumbnail from "@shared/loading-thumbnail/LoadingThumbnail";
import Button from "@shared/button/Button";
import Divider from "@shared/divider/Divider";
import styles from "./product-detail.module";

function ProductDetail() {
  const dispatch = useDispatch();
  const { id: productId } = useParams();
  const { isLoading, isError, isSuccess, error, productDetail } = useSelector(
    (state) => ({
      ...state.productDetail.query,
      productDetail: state.productDetail.data,
    })
  );

  const handleAddToCartBtnClick = () =>
    dispatch(addProductToCart({ productId, quantity: 1 }));

  useEffect(() => {
    dispatch(getProductDetail({ productId }));
  }, [dispatch, productId]);

  if (isLoading) return <div>loading...</div>;

  const { name, price, thumbnailImage } = productDetail;

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <LoadingThumbnail
          src={thumbnailImage.url}
          alt={thumbnailImage.alt}
          minHeight={300}
        />
        <p className={styles.productName}>{name}</p>
      </div>
      <Divider />
      <div className={styles.bottom}>
        <span className={styles.productPriceText}>금액</span>
        <p className={styles.productPrice}>{priceToDollar(price)}</p>
      </div>
      <Button variant="primary" block onClick={handleAddToCartBtnClick}>
        장바구니 담기
      </Button>
    </div>
  );
}

export default ProductDetail;
