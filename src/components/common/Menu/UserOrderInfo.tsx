import styled from '@emotion/styled';
import { Text } from '../Text/Text';
import { Link } from 'react-router-dom';

const UserOrderInfo = () => {
  return (
    <EventInfoWrapper to="/order">
      <Text color="#ffffff" size="small">
        주문 목록
      </Text>
    </EventInfoWrapper>
  );
};

export default UserOrderInfo;

const EventInfoWrapper = styled(Link)`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0 0 0 6px;
`;
