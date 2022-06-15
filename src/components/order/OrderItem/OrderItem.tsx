import Image from '@/components/common/Image/Image';
import { CartType } from '@/domain/product';
import useResponsive from '@/hooks/useResponsive';
import { useNavigate } from 'react-router-dom';
import * as Styled from './OrderItem.style';
function OrderCartItem({ cart, onClickCartItem }) {
  const { imageURL, name, price, quantity } = cart;

  const responsive = useResponsive();

  return (
    <Styled.OrderCartContainer>
      <Styled.OrderCartImageWrapper onClick={onClickCartItem}>
        <Image
          src={imageURL}
          alt=""
          width={responsive === 'desktop' ? '200px' : '150px'}
          height={responsive === 'desktop' ? '200px' : '150px'}
        />
      </Styled.OrderCartImageWrapper>

      <Styled.OrderCartNameWrapper onClick={onClickCartItem}>
        <h1>{name}</h1>
        <span>
          {price}원 / {quantity}개
        </span>
      </Styled.OrderCartNameWrapper>
    </Styled.OrderCartContainer>
  );
}

function OrderItem({
  order,
  onClickHeader,
}: {
  order: { id: number; orderDetails: CartType[] };
  onClickHeader?: () => void;
}) {
  const { id, orderDetails } = order;

  const navigate = useNavigate();

  const navigateProduct = productId => {
    navigate(`/products/${productId}`);
  };

  const isClickableHeader = onClickHeader ? true : false;

  return (
    <Styled.Container>
      <Styled.Header onClick={onClickHeader} isClickable={isClickableHeader}>
        <span>주문번호 : {id}</span>
        {isClickableHeader && <span>상세보기 &gt;</span>}
      </Styled.Header>

      {orderDetails.map(cart => (
        <OrderCartItem
          key={cart.id}
          cart={cart}
          onClickCartItem={() => navigateProduct(cart.productId)}
        />
      ))}
    </Styled.Container>
  );
}

export default OrderItem;
