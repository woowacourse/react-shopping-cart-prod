import { useSelector } from "react-redux";

function ProductDetail() {
  const productObjs = useSelector((state) => state.productObjs);
  console.log(productObjs);
  return <div>Product Detail</div>;
}

export default ProductDetail;
