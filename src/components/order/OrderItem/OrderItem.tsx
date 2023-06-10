import { styled } from 'styled-components';
import type { CartProduct, Order } from '../../../types/product';
import Image from '../../common/Image/Image';
import { formatPrice } from '../../../utils/formatPrice';

const OrderItem = (order: Order) => {
  const { id, cartItems } = order;

  return (
    <div>
      <OrderItemHead>주문 번호 {id}</OrderItemHead>
      {cartItems.map((cart) => (
        <li key={cart.id}>
          <CartItem {...cart} />
        </li>
      ))}
    </div>
  );
};

const OrderItemHead = styled.div`
  font-size: 18px;
  font-weight: 700;

  padding: 10px 0;

  border-bottom: 2px solid rgb(237, 237, 237);
`;

const CartItem = (cart: CartProduct) => {
  const { quantity } = cart;
  const { name, imageUrl, price } = cart.product;

  const totalAmount = formatPrice(quantity * price);

  return (
    <CartItemContainer>
      <Image src={imageUrl} />
      <ItemContents>
        <Name>{name}</Name>
        <Amount>
          {totalAmount} / 수량 {quantity}개
        </Amount>
      </ItemContents>
    </CartItemContainer>
  );
};

const CartItemContainer = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 30px;
`;

const ItemContents = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Name = styled.p`
  font-size: 20px;
  line-height: 20px;
`;

const Amount = styled.p`
  font-size: 16px;
  line-height: 20px;

  color: #888888;
`;

export default OrderItem;
