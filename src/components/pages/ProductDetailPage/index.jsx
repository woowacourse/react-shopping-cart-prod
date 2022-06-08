import React from "react";
import { useParams } from "react-router-dom";

import { BASE_SERVER_URL, SERVER_PATH } from "constants";
import { useFetch } from "hooks/useFetch";
import { getBaseServerProductItem } from "util/fetch";

import Spinner from "components/common/Spinner";
import ErrorPage from "components/pages/ErrorPage";
import ProductDetail from "./ProductDetail";
import { DetailContainer } from "./styled";

function ProductDetailPage() {
  const { productId } = useParams();
  const {
    data: selectedProduct,
    isLoading,
    errorMessage,
  } = useFetch(() =>
    getBaseServerProductItem({
      url: `${BASE_SERVER_URL}${SERVER_PATH.PRODUCT_LIST}/${productId}`,
    })
  );

  const renderContent = () => {
    if (isLoading) return <Spinner />;
    if (errorMessage)
      return (
        <ErrorPage>
          😱 Error: 관리자에게 문의하세요.😱 <br /> %{errorMessage}%
        </ErrorPage>
      );
    return <ProductDetail selectedProduct={selectedProduct} />;
  };

  return <DetailContainer>{renderContent()}</DetailContainer>;
}

export default ProductDetailPage;
