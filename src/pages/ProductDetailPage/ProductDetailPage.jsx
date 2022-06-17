import { useEffect } from "react";
import { useParams } from "react-router-dom";

import LoadingThumbnail from "@components/LoadingThumbnail";
import Button from "@components/Button";
import Divider from "@components/Divider";

import styles from "./ProductDetailPage.module";
import { REQUEST_METHOD, FETCH_STATUS, API_SERVER } from "../../constants";
import { useFetch } from "../../hooks/useFetch";

function ProductDetailPage() {
  const { id: productId } = useParams();

  const {
    fetch: getProductDetail,
    data: productDetail,
    status: getProductDetailStatus,
    error: getProductDetailError,
  } = useFetch(
    REQUEST_METHOD.GET,
    `${API_SERVER.BASE_URL}${API_SERVER.PATH.PRODUCTS}/${productId}`
  );

  const {
    fetch: addProductToCart,
    status: addProductToCartStatus,
    error: addProductToCartError,
  } = useFetch(
    REQUEST_METHOD.POST,
    `${API_SERVER.BASE_URL}${API_SERVER.PATH.PRODUCTS}`,
    {},
    { productId, quantity: 1 }
  );

  const handleAddToCartButtonClick = () => {
    addProductToCart();
  };

  useEffect(() => {
    getProductDetail();
  }, []);

  useEffect(() => {
    if (addProductToCartStatus === FETCH_STATUS.FAIL) {
      alert(`${addProductToCartError.code}, ${addProductToCartError.message}`);
    }
  }, [addProductToCartStatus, addProductToCartError]);

  if (getProductDetailStatus === FETCH_STATUS.PENDING)
    return <div>...Loading</div>;
  if (getProductDetailStatus === FETCH_STATUS.FAIL)
    return (
      <div>
        ERROR!! : {getProductDetailError.code}, {getProductDetailError.message}
      </div>
    );

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
        <p className={styles.productPrice}>{price.toLocaleString()}원</p>
      </div>
      <Button variant="primary" block onClick={handleAddToCartButtonClick}>
        장바구니 담기
      </Button>
    </div>
  );
}

export default ProductDetailPage;
