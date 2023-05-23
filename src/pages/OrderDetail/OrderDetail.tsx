import { useParams } from "react-router-dom";

function OrderDetail() {

  const params = useParams();

  return (
    <>
      주문상세 : {params.orderId}
    </>
  );
}

export default OrderDetail;
