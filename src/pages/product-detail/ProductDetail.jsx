import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function ProductDetail() {
  const { id: productId } = useParams();
  const { isLoading, isError, isSuccess, error, productDetail } = useSelector(
    (state) => ({
      ...state.productDetail.query,
      productDetail: state.productDetail.data,
    }));
  
  return <div>Product Detail</div>;
}

export default ProductDetail;
