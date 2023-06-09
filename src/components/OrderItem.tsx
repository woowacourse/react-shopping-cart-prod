import { Link, useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import { ROUTE_PATH } from '../constants';
import { ProductInOrder } from '../types';
import OrderItemInfo from './OrderItemInfo';

type OrderItemProps = {
  orderId: number;
  products: ProductInOrder[];
  orderStatus: string;
  createdAt: string;
};

const OrderItem: React.FC<OrderItemProps> = ({ orderId, products, orderStatus, createdAt }) => {
  const params = useParams();
  const isDetailPage = 'id' in params;

  const orderTitle = isDetailPage ? '상세정보' : `${orderStatus}: ${new Date(createdAt).toLocaleDateString('ko-KR')}`;

  return (
    <Item>
      <Title>
        <div>
          <TitleText>{orderTitle}</TitleText>
        </div>
        {isDetailPage || <StyledLink to={`${ROUTE_PATH.ORDER_PAGE}/${orderId}`}>상세보기 &gt;</StyledLink>}
      </Title>
      {products.map((product) => (
        <OrderItemInfo key={product.id} {...product} />
      ))}
    </Item>
  );
};

export default OrderItem;

const Item = styled.li`
  margin-top: 30px;
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 80px;
  padding: 40px;
  border-bottom: 2px solid var(--gray-color-300);
  font-size: 20px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const TitleText = styled.div``;
