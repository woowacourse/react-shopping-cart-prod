import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { Order } from '../../types/response';
import OrderItem from './OrderItem/OrderItem';
import { PATH } from '../../constants/path';
import { WIDTH } from '../../styles/mediaQuery';

type OrderCardProps = Order & {
  showDetailButton: boolean;
};

const OrderCard = ({
  id,
  items,
  productPrice,
  discountPrice,
  deliveryFee,
  totalPrice,
  showDetailButton,
}: OrderCardProps) => {
  const navigate = useNavigate();

  const onClickNavigate = () => {
    navigate(`${PATH.ORDER_DETAIL_PAGE}/${id}`, {
      state: {
        id,
        items,
        productPrice,
        discountPrice,
        deliveryFee,
        totalPrice,
      },
    });
  };
  return (
    <Wrapper>
      <TopSection>
        <div>
          Order No. <span>{id}</span>
        </div>
        {showDetailButton && (
          <button onClick={onClickNavigate}>상세보기</button>
        )}
      </TopSection>
      <BottomSection>
        {items.map((item) => {
          const { quantity, product } = item;
          const { id: productId, name, price, imageUrl } = product;

          return (
            <OrderItem
              key={`${id}/${productId}`}
              quantity={quantity}
              name={name}
              price={price}
              imageUrl={imageUrl}
            />
          );
        })}
      </BottomSection>
    </Wrapper>
  );
};

export default OrderCard;

const Wrapper = styled.ul`
  width: 100%;
`;

const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0 32px;

  width: 100%;
  height: 50px;

  font-size: 16px;
  font-weight: 200;

  border-bottom: 1px solid #dad8d8;

  @media (max-width: ${WIDTH.MD}) {
    height: 48px;

    font-size: 12px;
  }
`;

const BottomSection = styled.div``;
