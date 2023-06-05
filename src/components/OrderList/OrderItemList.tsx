import { Link } from 'react-router-dom';
import { OrderInfo } from '../../types';
import * as S from './styles/OrderItemList.styles';

export default function OrderItemList(props: OrderInfo) {
  const { orderId, items, orderedAt } = props;

  const setAltSrc = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = './emptyProduct.svg';
  };

  return (
    <S.Wrapper>
      <S.OrderIdTitle>
        <p>주문번호 : {orderId}</p>
        <Link to={`/order/${orderId}`}>상세보기 &gt; </Link>
      </S.OrderIdTitle>
      <S.OrderDetail>
        <div>
          <S.Image src={`${items[0].product.imageUrl}`} onError={setAltSrc} alt="상품 이미지" />
        </div>
        <div>
          <S.ItemNameText>{items[0].product.name}</S.ItemNameText>
          <S.ItemCountText>총 수량 : {items.length}개</S.ItemCountText>
          <S.ItemPriceText>{items[0].product.price} 원</S.ItemPriceText>
        </div>
      </S.OrderDetail>
    </S.Wrapper>
  );
}
