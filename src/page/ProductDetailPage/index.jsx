import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';

import ErrorPendingBoundary from 'component/common/ErrorPendingBoundary';
import DetailItem from 'component/DetailItem';
import NotFoundPage from 'page/NotFoundPage';
import * as S from 'page/ProductDetailPage/style';

import useFetch from 'hook/useFetch';
import useCartItem from 'hook/useCartItem';
import {API_URL} from 'constant';

export default function ProductDetailPage() {
  const {id} = useParams();

  const {initializeCart} = useCartItem();

  const {
    pending: detailPending,
    data: detailProduct,
    error: detailError,
    fetch: fetchProductDetail,
  } = useFetch('get');

  useEffect(() => {
    initializeCart();
  }, [initializeCart]);

  useEffect(() => {
    fetchProductDetail({API_URL: `${API_URL}/products/${id}`});
  }, [fetchProductDetail, id]);

  return (
    <S.DetailItemPageLayout>
      <ErrorPendingBoundary
        fallback={<NotFoundPage>해당 상품이 없어요😢</NotFoundPage>}
        pending={detailPending}
        error={detailError}
      >
        {detailProduct && <DetailItem productInfo={detailProduct} />}
      </ErrorPendingBoundary>
    </S.DetailItemPageLayout>
  );
}
