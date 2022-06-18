import CroppedImage from 'components/@common/CroppedImage';
import Button from 'components/@common/Button';
import RequestFail from 'components/@common/RequestFail';
import Loading from 'components/@common/Loading';
import { Styled } from './styles';
import { useItemDetail } from './useItemDetail';

const ItemDetail = () => {
  const { loading, error, item, onClick } = useItemDetail();

  if (loading) return <Loading />;
  if (error) return <RequestFail />;

  return (
    <Styled.ItemDetailPage>
      <CroppedImage src={item.imageUrl} width='57rem' height='57rem' alt='상품' />
      <Styled.Title>{item.name}</Styled.Title>
      <Styled.Price>
        <Styled.PriceDescription>금액</Styled.PriceDescription>
        <Styled.PriceValue>{item.price}</Styled.PriceValue>
      </Styled.Price>
      <Button size='large' backgroundColor='brown' onClick={onClick}>
        장바구니에 담기
      </Button>
    </Styled.ItemDetailPage>
  );
};

export default ItemDetail;
