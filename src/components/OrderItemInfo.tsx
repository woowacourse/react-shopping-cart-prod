import { styled } from 'styled-components';

type OrderItemInfoProps = {
  name: string;
  imageUrl: string;
  quantity: number;
  totalPrice: number;
};

const OrderItemInfo: React.FC<OrderItemInfoProps> = ({ name, imageUrl, quantity, totalPrice }) => {
  return (
    <Grid>
      <ThumbnailWrapper>
        <Thumbnail src={imageUrl} alt={name} />
      </ThumbnailWrapper>
      <Name>{name}</Name>
      <EachPrice>개당 {(totalPrice / quantity).toLocaleString('ko-KR')}원</EachPrice>
      <TotalPrice>
        {totalPrice.toLocaleString('ko-KR')}원 / 수량: {quantity}개
      </TotalPrice>
    </Grid>
  );
};
export default OrderItemInfo;

const Grid = styled.div`
  padding: 40px 30px;

  display: grid;
  grid-column-gap: 20px;
  grid-template-columns: 1fr 5fr;
  grid-template-areas:
    'image name'
    'image each'
    'image total';

  border-bottom: 1.5px solid #ccc;
`;

const ThumbnailWrapper = styled.div`
  grid-area: image;

  width: 140px;
  height: 140px;
`;

const Thumbnail = styled.img`
  width: 140px;
  height: 140px;
`;

const Name = styled.div`
  grid-area: name;

  font-size: 20px;
`;

const TotalPrice = styled.div`
  grid-area: total;

  font-size: 16px;
  color: #888888;
`;

const EachPrice = styled.div`
  grid-area: each;

  font-size: 16px;
  color: #888888;
`;
