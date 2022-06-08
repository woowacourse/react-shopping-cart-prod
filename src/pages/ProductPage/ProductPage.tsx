import { useParams } from 'react-router-dom';
import Button from 'components/Button/Button';
import DivideLine from 'components/DivideLine/DivideLine';
import Spinner from 'components/Spinner/Spinner';
import useProductDetail from 'pages/ProductPage/useProductDetail';
import * as S from 'pages/ProductPage/ProductPage.styled';

function ProductPage() {
  const { id } = useParams();
  const {
    accessToken,
    isLoading,
    productDetail,
    isAddedToCart,
    error,
    addItemToCart,
  } = useProductDetail(Number(id));

  if (error) {
    alert(error);
  }

  if (isLoading) {
    return <Spinner />;
  }

  if (productDetail) {
    return (
      <S.PageBox>
        <S.ImageBox>
          <img src={productDetail.imageUrl} alt={productDetail.name} />
        </S.ImageBox>
        <S.Title>{productDetail.name}</S.Title>
        <DivideLine color="gray" thickness="thin" />
        <S.DescriptionList>
          <dt>가격</dt>
          <dd>{productDetail.price.toLocaleString('ko-KR')} 원</dd>
        </S.DescriptionList>
        <S.DescriptionList>
          <dt>제품 설명</dt>
          <dd>{productDetail.description}</dd>
        </S.DescriptionList>
        {accessToken &&
          (isAddedToCart ? (
            <Button disabled>이미 추가됨</Button>
          ) : (
            <Button onClick={addItemToCart}>장바구니</Button>
          ))}
      </S.PageBox>
    );
  }

  return (
    <S.PageBox>
      <S.ImageBox>
        <S.EmptyImageBox>존재하지 않는 상품입니다.</S.EmptyImageBox>
      </S.ImageBox>
    </S.PageBox>
  );
}

export default ProductPage;
