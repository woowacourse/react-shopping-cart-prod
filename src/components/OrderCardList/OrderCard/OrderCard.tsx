import Box from 'components/@common/Box';
import OrderProductCard from 'components/OrderProductSection/OrderProductCardList/OrderProductCard/OrderProductCard';
import ROUTE_PATH from 'constants/routePath';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Order } from 'types/order';
import Accordion from 'components/@common/Accordion';

type OrderCardProps = {
  order: Order;
  isDetail?: boolean;
};

const OrderCard = ({ order, isDetail = false }: OrderCardProps) => {
  const { orderId, products } = order;

  return (
    <Box sizing={{ width: '100%' }} flex={{ flexDirection: 'column' }}>
      <Accordion.Root>
        <OrderLabel sizing={{ width: '100%', height: '40px' }} flex={{ justify: 'space-between' }}>
          <Accordion.Trigger>
            <OrderIdText>{`주문 번호: ${orderId}`}</OrderIdText>
          </Accordion.Trigger>
        </OrderLabel>
        <Accordion.Content>
          {products.map((product) => (
            <OrderProductCard key={product.product.id} checkedCartProduct={product} />
          ))}

          {!isDetail && (
            <Box sizing={{ width: '100%' }} flex={{ justify: 'flex-end' }}>
              <DetailLink to={`${ROUTE_PATH.ORDER_LIST}/${orderId}`}>{`주문 상세`}</DetailLink>
            </Box>
          )}
        </Accordion.Content>
      </Accordion.Root>
    </Box>
  );
};

export default OrderCard;

const OrderLabel = styled(Box)`
  padding: 10px;
  color: var(--color-pure-dark);
  border-bottom: solid 1px var(--color-grayscale-300);

  :hover {
    background-color: var(--color-grayscale-100);
  }
`;

const OrderIdText = styled.span`
  font-size: 16px;
  font-weight: 700;
`;

const DetailLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 30px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 700;
  color: var(--color-pure-dark);
  background-color: var(--color-grayscale-200);

  :hover {
    filter: brightness(1.05);
  }
`;
